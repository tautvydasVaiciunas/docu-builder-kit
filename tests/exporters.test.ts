import test from "node:test";
import assert from "node:assert/strict";

import { calculateTotals, escapePdf, generatePurchaseOrderPDF } from "../src/lib/exporters.js";
import type { DocumentData } from "../src/types/purchase-order.js";

test("escapePdf escapes parentheses and special characters", () => {
  const input = `Line (Item) with \\ special${String.fromCharCode(8)} chars\nNext\tLine\rCarriage\fForm`;
  const expected = "Line \\(Item\\) with \\\\ special\\b chars\\nNext\\tLine\\rCarriage\\fForm";

  assert.equal(escapePdf(input), expected);
});

test("generatePurchaseOrderPDF produces an openable PDF with escaped content", async () => {
  const data: DocumentData = {
    poNumber: "PO-(123)",
    buyer: {
      name: "Buyer (Example)",
      address: "123 Example St (Suite 100)\nCity, ST",
      email: "buyer@example.com",
      phone: "(555) 010-0000",
      vatNumber: "VAT-(123)",
    },
    vendor: {
      name: "Vendor (Example)",
      address: "456 Vendor Rd\nTown, ST",
      email: "vendor@example.com",
      phone: "(555) 010-0001",
      vatNumber: "VAT-(456)",
    },
    lineItems: [
      {
        id: "1",
        description: "Service (Monthly)",
        quantity: 2,
        unitPrice: 150,
        total: 300,
      },
    ],
    currency: "USD",
    taxRate: 5,
    notes: "Note (Special)\nSecond line",
  };

  const pdfBlob = await generatePurchaseOrderPDF(data);
  const buffer = Buffer.from(await pdfBlob.arrayBuffer());
  const pdfContent = buffer.toString("latin1");

  assert.ok(pdfContent.startsWith("%PDF-1.4"), "PDF header is present");
  assert.ok(
    pdfContent.includes("PO Number: PO-\\(123\\)"),
    "Escaped parentheses should be present in PDF stream",
  );
  assert.ok(
    pdfContent.endsWith("\n%%EOF\n"),
    "PDF should terminate with a newline after the EOF marker",
  );
});

test("calculateTotals preserves fractional quantities in grand total", () => {
  const data: DocumentData = {
    poNumber: "PO-100", // minimal stub to satisfy type
    buyer: {
      name: "Buyer",
      address: "123 Street",
      email: "buyer@example.com",
      phone: "555-0000",
      vatNumber: "VAT-123",
    },
    vendor: {
      name: "Vendor",
      address: "456 Avenue",
      email: "vendor@example.com",
      phone: "555-0001",
      vatNumber: "VAT-456",
    },
    lineItems: [
      {
        id: "fractional",
        description: "Half-day consulting",
        quantity: 1.5,
        unitPrice: 199.99,
        total: Number((1.5 * 199.99).toFixed(2)),
      },
    ],
    currency: "USD",
    taxRate: 0,
    notes: "",
  };

  const { grandTotal } = calculateTotals(data);
  assert.equal(grandTotal, 299.99);
});
