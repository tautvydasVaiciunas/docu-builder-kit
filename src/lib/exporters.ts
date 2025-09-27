import type { DocumentData } from "@/components/generator/DocumentForm";

const WATERMARK_TEXT = "Generated with Docu Builder Kit · Free Plan";
const PDF_TITLE = "Purchase Order";

function formatCurrency(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value);
}

function escapePdf(text: string) {
  return text.replace(/\\/g, "\\\\").replace(/\\(/g, "\\(").replace(/\\)/g, "\\)");
}

function xmlEscape(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function calculateTotals(data: DocumentData) {
  const subtotal = data.lineItems.reduce((sum, item) => {
    const total = item.total ?? item.quantity * item.unitPrice;
    return sum + total;
  }, 0);
  const taxAmount = subtotal * (data.taxRate / 100);
  const grandTotal = subtotal + taxAmount;
  return {
    subtotal,
    taxAmount,
    grandTotal,
  };
}

function buildPdfContentLines(data: DocumentData) {
  const lines: string[] = [];
  lines.push(`PO Number: ${data.poNumber || "N/A"}`);
  lines.push("Date: " + new Date().toLocaleDateString());
  lines.push("");
  lines.push("Buyer");
  lines.push(`  ${data.buyer.name || "—"}`.trimEnd());
  if (data.buyer.address) {
    data.buyer.address.split("\\n").forEach(line => lines.push(`  ${line}`));
  }
  if (data.buyer.email) {
    lines.push(`  Email: ${data.buyer.email}`);
  }
  if (data.buyer.phone) {
    lines.push(`  Phone: ${data.buyer.phone}`);
  }
  if (data.buyer.vatNumber) {
    lines.push(`  VAT: ${data.buyer.vatNumber}`);
  }
  lines.push("");
  lines.push("Vendor");
  lines.push(`  ${data.vendor.name || "—"}`.trimEnd());
  if (data.vendor.address) {
    data.vendor.address.split("\\n").forEach(line => lines.push(`  ${line}`));
  }
  if (data.vendor.email) {
    lines.push(`  Email: ${data.vendor.email}`);
  }
  if (data.vendor.phone) {
    lines.push(`  Phone: ${data.vendor.phone}`);
  }
  if (data.vendor.vatNumber) {
    lines.push(`  VAT: ${data.vendor.vatNumber}`);
  }
  lines.push("");
  lines.push("Line Items");
  if (data.lineItems.length === 0) {
    lines.push("  No line items added");
  } else {
    data.lineItems.forEach((item, index) => {
      const total = item.total ?? item.quantity * item.unitPrice;
      lines.push(`  ${index + 1}. ${item.description || "Item"} — ${item.quantity} × ${formatCurrency(item.unitPrice, data.currency)} = ${formatCurrency(total, data.currency)}`);
    });
  }

  const { subtotal, taxAmount, grandTotal } = calculateTotals(data);
  lines.push("");
  lines.push(`Subtotal: ${formatCurrency(subtotal, data.currency)}`);
  lines.push(`Tax (${data.taxRate}%): ${formatCurrency(taxAmount, data.currency)}`);
  lines.push(`Total: ${formatCurrency(grandTotal, data.currency)}`);

  if (data.notes) {
    lines.push("");
    lines.push("Notes:");
    data.notes.split("\\n").forEach(line => lines.push(`  ${line}`));
  }

  return lines;
}

export async function generatePurchaseOrderPDF(data: DocumentData) {
  const encoder = new TextEncoder();
  const lines = buildPdfContentLines(data);

  const textOps: string[] = [
    "BT",
    "/F1 20 Tf",
    "50 780 Td",
    `(${escapePdf(PDF_TITLE)}) Tj`,
    "/F1 12 Tf",
    "0 -24 Td",
    "16 TL",
  ];

  lines.forEach((line, index) => {
    if (index === 0) {
      textOps.push(`(${escapePdf(line)}) Tj`);
    } else {
      textOps.push("T*");
      textOps.push(`(${escapePdf(line)}) Tj`);
    }
  });
  textOps.push("ET");

  const watermarkOps: string[] = [
    "q",
    "0.7071 0.7071 -0.7071 0.7071 220 220 cm",
    "0.85 g",
    "BT",
    "/F1 42 Tf",
    "0 0 Td",
    `(${escapePdf(WATERMARK_TEXT)}) Tj`,
    "ET",
    "Q",
  ];

  const contentStream = [...textOps, ...watermarkOps].join("\\n") + "\\n";
  const contentBytes = encoder.encode(contentStream);

  const objects: string[] = [];
  const addObject = (content: string) => {
    const index = objects.length + 1;
    objects.push(`${index} 0 obj\\n${content}\\nendobj\\n`);
    return index;
  };

  const fontObj = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const contentObj = addObject(
    `<< /Length ${contentBytes.length} >>\\nstream\\n${contentStream}endstream`,
  );
  const pageObj = addObject(
    `<< /Type /Page /Parent 4 0 R /MediaBox [0 0 612 792] /Contents ${contentObj} 0 R /Resources << /Font << /F1 ${fontObj} 0 R >> >> >>`,
  );
  const pagesObj = addObject(`<< /Type /Pages /Kids [${pageObj} 0 R] /Count 1 >>`);
  const catalogObj = addObject(`<< /Type /Catalog /Pages ${pagesObj} 0 R >>`);

  const header = "%PDF-1.4\\n";
  const parts: string[] = [header];
  const offsets: number[] = [0];
  let currentOffset = encoder.encode(header).length;

  objects.forEach(obj => {
    offsets.push(currentOffset);
    parts.push(obj);
    currentOffset += encoder.encode(obj).length;
  });

  const xrefOffset = currentOffset;
  let xref = `xref\\n0 ${objects.length + 1}\\n`;
  xref += "0000000000 65535 f \\n";
  for (let i = 1; i < offsets.length; i++) {
    xref += `${offsets[i].toString().padStart(10, "0")} 00000 n \\n`;
  }

  const trailer = `trailer\\n<< /Size ${objects.length + 1} /Root ${catalogObj} 0 R >>\\nstartxref\\n${xrefOffset}\\n%%EOF`;
  parts.push(xref);
  parts.push(trailer);

  const pdfContent = parts.join("");
  return new Blob([encoder.encode(pdfContent)], { type: "application/pdf" });
}

function createParagraph(
  text: string,
  options?: {
    bold?: boolean;
    italic?: boolean;
    center?: boolean;
    size?: number;
    color?: string;
  },
) {
  const paragraphProps = options?.center ? `<w:pPr><w:jc w:val="center"/></w:pPr>` : "";
  const runProps: string[] = [];
  if (options?.bold) {
    runProps.push('<w:b/>');
  }
  if (options?.italic) {
    runProps.push('<w:i/>');
  }
  if (options?.size) {
    runProps.push(`<w:sz w:val="${options.size}"/>`, `<w:szCs w:val="${options.size}"/>`);
  }
  if (options?.color) {
    runProps.push(`<w:color w:val="${options.color}"/>`);
  }
  const runPropsXml = runProps.length ? `<w:rPr>${runProps.join("")}</w:rPr>` : "";
  const textXml = text ? `<w:t xml:space="preserve">${xmlEscape(text)}</w:t>` : "<w:t/>";
  return `<w:p>${paragraphProps}<w:r>${runPropsXml}${textXml}</w:r></w:p>`;
}

function createDocumentXml(data: DocumentData) {
  const paragraphs: string[] = [];
  paragraphs.push(createParagraph(PDF_TITLE, { bold: true, center: true, size: 48 }));
  paragraphs.push(createParagraph(`Purchase Order #: ${data.poNumber || "N/A"}`));
  paragraphs.push(createParagraph(`Date: ${new Date().toLocaleDateString()}`));
  paragraphs.push(createParagraph(""));

  paragraphs.push(createParagraph("Buyer", { bold: true }));
  paragraphs.push(createParagraph(data.buyer.name || "—"));
  if (data.buyer.address) {
    data.buyer.address.split("\\n").forEach(line => paragraphs.push(createParagraph(line)));
  }
  if (data.buyer.email) {
    paragraphs.push(createParagraph(`Email: ${data.buyer.email}`));
  }
  if (data.buyer.phone) {
    paragraphs.push(createParagraph(`Phone: ${data.buyer.phone}`));
  }
  if (data.buyer.vatNumber) {
    paragraphs.push(createParagraph(`VAT: ${data.buyer.vatNumber}`));
  }
  paragraphs.push(createParagraph(""));

  paragraphs.push(createParagraph("Vendor", { bold: true }));
  paragraphs.push(createParagraph(data.vendor.name || "—"));
  if (data.vendor.address) {
    data.vendor.address.split("\\n").forEach(line => paragraphs.push(createParagraph(line)));
  }
  if (data.vendor.email) {
    paragraphs.push(createParagraph(`Email: ${data.vendor.email}`));
  }
  if (data.vendor.phone) {
    paragraphs.push(createParagraph(`Phone: ${data.vendor.phone}`));
  }
  if (data.vendor.vatNumber) {
    paragraphs.push(createParagraph(`VAT: ${data.vendor.vatNumber}`));
  }
  paragraphs.push(createParagraph(""));

  paragraphs.push(createParagraph("Line Items", { bold: true }));
  if (data.lineItems.length === 0) {
    paragraphs.push(createParagraph("No line items added"));
  } else {
    data.lineItems.forEach((item, index) => {
      const total = item.total ?? item.quantity * item.unitPrice;
      paragraphs.push(
        createParagraph(
          `${index + 1}. ${item.description || "Item"} — ${item.quantity} × ${formatCurrency(item.unitPrice, data.currency)} = ${formatCurrency(total, data.currency)}`,
        ),
      );
    });
  }

  const { subtotal, taxAmount, grandTotal } = calculateTotals(data);
  paragraphs.push(createParagraph(""));
  paragraphs.push(createParagraph(`Subtotal: ${formatCurrency(subtotal, data.currency)}`));
  paragraphs.push(createParagraph(`Tax (${data.taxRate}%): ${formatCurrency(taxAmount, data.currency)}`));
  paragraphs.push(createParagraph(`Total: ${formatCurrency(grandTotal, data.currency)}`, { bold: true }));

  if (data.notes) {
    paragraphs.push(createParagraph(""));
    paragraphs.push(createParagraph("Notes", { bold: true }));
    data.notes.split("\\n").forEach(line => paragraphs.push(createParagraph(line)));
  }

  paragraphs.push(createParagraph(""));
  paragraphs.push(createParagraph(WATERMARK_TEXT, { italic: true, center: true, color: "999999" }));

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  <w:document xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
    xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math"
    xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing"
    xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"
    xmlns:w10="urn:schemas-microsoft-com:office:word"
    xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
    xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml"
    xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup"
    xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk"
    xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml"
    xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape"
    mc:Ignorable="w14 wp14">
    <w:body>
      ${paragraphs.join("\\n      ")}
      <w:sectPr>
        <w:pgSz w:w="12240" w:h="15840"/>
        <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="708" w:footer="708" w:gutter="0"/>
        <w:cols w:space="708"/>
        <w:docGrid w:linePitch="360"/>
      </w:sectPr>
    </w:body>
  </w:document>`;
}

function createDocxFileMap(data: DocumentData) {
  const nowIso = new Date().toISOString();
  const documentXml = createDocumentXml(data);

  return [
    {
      path: "[Content_Types].xml",
      content: `<?xml version="1.0" encoding="UTF-8"?>
  <Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
    <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
    <Default Extension="xml" ContentType="application/xml"/>
    <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
    <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
    <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
  </Types>`
        .trim(),
    },
    {
      path: "_rels/.rels",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
    <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
    <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
    <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
  </Relationships>`
        .trim(),
    },
    {
      path: "docProps/app.xml",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  <Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
    <Application>Docu Builder Kit</Application>
  </Properties>`
        .trim(),
    },
    {
      path: "docProps/core.xml",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  <cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <dc:title>Purchase Order</dc:title>
    <dc:subject>Generated Purchase Order</dc:subject>
    <dc:creator>Docu Builder Kit</dc:creator>
    <cp:lastModifiedBy>Docu Builder Kit</cp:lastModifiedBy>
    <dcterms:created xsi:type="dcterms:W3CDTF">${nowIso}</dcterms:created>
    <dcterms:modified xsi:type="dcterms:W3CDTF">${nowIso}</dcterms:modified>
  </cp:coreProperties>`
        .trim(),
    },
    {
      path: "word/_rels/document.xml.rels",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"/>`
        .trim(),
    },
    {
      path: "word/document.xml",
      content: documentXml,
    },
  ];
}

function crc32(bytes: Uint8Array) {
  let crc = 0 ^ -1;
  for (let i = 0; i < bytes.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ bytes[i]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      if (c & 1) {
        c = 0xedb88320 ^ (c >>> 1);
      } else {
        c >>>= 1;
      }
    }
    table[i] = c >>> 0;
  }
  return table;
})();

function createZipArchive(files: { path: string; content: string }[]) {
  const encoder = new TextEncoder();
  const localParts: Uint8Array[] = [];
  const centralParts: Uint8Array[] = [];
  let offset = 0;

  files.forEach(file => {
    const fileNameBytes = encoder.encode(file.path);
    const contentBytes = encoder.encode(file.content);
    const crc = crc32(contentBytes);

    const localHeader = new Uint8Array(30 + fileNameBytes.length);
    const localView = new DataView(localHeader.buffer);
    localView.setUint32(0, 0x04034b50, true);
    localView.setUint16(4, 20, true);
    localView.setUint16(6, 0, true);
    localView.setUint16(8, 0, true);
    localView.setUint16(10, 0, true);
    localView.setUint16(12, 0, true);
    localView.setUint32(14, crc, true);
    localView.setUint32(18, contentBytes.length, true);
    localView.setUint32(22, contentBytes.length, true);
    localView.setUint16(26, fileNameBytes.length, true);
    localView.setUint16(28, 0, true);
    localHeader.set(fileNameBytes, 30);

    localParts.push(localHeader);
    localParts.push(contentBytes);

    const centralHeader = new Uint8Array(46 + fileNameBytes.length);
    const centralView = new DataView(centralHeader.buffer);
    centralView.setUint32(0, 0x02014b50, true);
    centralView.setUint16(4, 20, true);
    centralView.setUint16(6, 20, true);
    centralView.setUint16(8, 0, true);
    centralView.setUint16(10, 0, true);
    centralView.setUint16(12, 0, true);
    centralView.setUint16(14, 0, true);
    centralView.setUint32(16, crc, true);
    centralView.setUint32(20, contentBytes.length, true);
    centralView.setUint32(24, contentBytes.length, true);
    centralView.setUint16(28, fileNameBytes.length, true);
    centralView.setUint16(30, 0, true);
    centralView.setUint16(32, 0, true);
    centralView.setUint16(34, 0, true);
    centralView.setUint16(36, 0, true);
    centralView.setUint32(38, 0, true);
    centralView.setUint32(42, offset, true);
    centralHeader.set(fileNameBytes, 46);

    centralParts.push(centralHeader);
    offset += localHeader.length + contentBytes.length;
  });

  const centralDirectoryLength = centralParts.reduce((sum, part) => sum + part.length, 0);
  const centralDirectoryOffset = offset;
  const endRecord = new Uint8Array(22);
  const endView = new DataView(endRecord.buffer);
  endView.setUint32(0, 0x06054b50, true);
  endView.setUint16(4, 0, true);
  endView.setUint16(6, 0, true);
  endView.setUint16(8, files.length, true);
  endView.setUint16(10, files.length, true);
  endView.setUint32(12, centralDirectoryLength, true);
  endView.setUint32(16, centralDirectoryOffset, true);
  endView.setUint16(20, 0, true);

  const totalLength = offset + centralDirectoryLength + endRecord.length;
  const zipBytes = new Uint8Array(totalLength);
  let position = 0;

  localParts.forEach(part => {
    zipBytes.set(part, position);
    position += part.length;
  });

  centralParts.forEach(part => {
    zipBytes.set(part, position);
    position += part.length;
  });

  zipBytes.set(endRecord, position);

  return zipBytes;
}

export async function generatePurchaseOrderDOCX(data: DocumentData) {
  const files = createDocxFileMap(data);
  const zipBytes = createZipArchive(files);
  return new Blob([zipBytes], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
}
