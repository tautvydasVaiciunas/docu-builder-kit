import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

interface EmailAttachment {
  filename: string;
  contentType: string;
  base64: string;
}

interface PurchaseOrderEmailPayload {
  vendorEmail: string;
  buyerEmail?: string;
  subject: string;
  message: string;
  attachment: EmailAttachment;
  metadata: {
    poNumber: string;
    buyerName: string;
    vendorName: string;
    currency: string;
    total: number;
  };
  document: Record<string, unknown>;
}

interface PurchaseOrderEmailResponse {
  success: boolean;
  message?: string;
}

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const RESEND_FROM_EMAIL = Deno.env.get("RESEND_FROM_EMAIL") ?? "purchase-orders@example.com";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return char;
    }
  });
}

function buildEmailContent(payload: PurchaseOrderEmailPayload) {
  const { message, metadata } = payload;
  const safeMessage = escapeHtml(String(message ?? "")).replace(/\n/g, "<br />");
  const poNumber = escapeHtml(String(metadata.poNumber ?? ""));
  const buyerName = escapeHtml(String(metadata.buyerName ?? ""));
  const vendorName = escapeHtml(String(metadata.vendorName ?? ""));
  const currency = escapeHtml(String(metadata.currency ?? ""));
  const totalValue = Number.isFinite(metadata.total)
    ? String(metadata.total)
    : String(metadata.total ?? "");
  const totalDisplay = escapeHtml(`${currency} ${totalValue}`.trim());

  const html = `
    <div>
      <p>${safeMessage}</p>
      <hr />
      <p><strong>Purchase Order Summary</strong></p>
      <ul>
        <li><strong>PO Number:</strong> ${poNumber}</li>
        <li><strong>Buyer:</strong> ${buyerName}</li>
        <li><strong>Vendor:</strong> ${vendorName}</li>
        <li><strong>Total:</strong> ${totalDisplay}</li>
      </ul>
    </div>
  `;

  const text = [
    String(message ?? ""),
    "",
    "Purchase Order Summary:",
    `- PO Number: ${metadata.poNumber}`,
    `- Buyer: ${metadata.buyerName}`,
    `- Vendor: ${metadata.vendorName}`,
    `- Total: ${metadata.currency} ${totalValue}`,
  ].join("\n");

  return { html, text };
}

async function sendWithResend(payload: PurchaseOrderEmailPayload) {
  if (!RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const recipients = [payload.vendorEmail];
  if (payload.buyerEmail) {
    recipients.push(payload.buyerEmail);
  }

  if (recipients.length === 0) {
    throw new Error("No recipients provided for the purchase order email.");
  }

  const { html, text } = buildEmailContent(payload);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to: recipients,
      subject: payload.subject,
      html,
      text,
      attachments: payload.attachment
        ? [
            {
              filename: payload.attachment.filename,
              content: payload.attachment.base64,
              contentType: payload.attachment.contentType,
            },
          ]
        : undefined,
      tags: [
        { name: "poNumber", value: payload.metadata.poNumber },
        { name: "buyer", value: payload.metadata.buyerName },
      ],
    }),
  });

  if (!response.ok) {
    let errorMessage = `Email provider responded with status ${response.status}`;
    try {
      const errorBody = await response.json();
      if (errorBody?.message) {
        errorMessage = errorBody.message;
      } else if (errorBody?.error) {
        errorMessage = errorBody.error;
      }
    } catch (_) {
      // ignore parsing errors
    }
    throw new Error(errorMessage);
  }

  const result = (await response.json()) as { id?: string };
  const message = result?.id
    ? `Purchase order email sent successfully (reference: ${result.id}).`
    : "Purchase order email sent successfully.";

  const body: PurchaseOrderEmailResponse = {
    success: true,
    message,
  };

  return new Response(JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  let payload: PurchaseOrderEmailPayload;
  try {
    payload = (await req.json()) as PurchaseOrderEmailPayload;
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!payload?.vendorEmail || !payload?.subject || !payload?.attachment?.base64) {
    return new Response(
      JSON.stringify({
        error: "Missing required email fields. Vendor email, subject, and attachment are required.",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    return await sendWithResend(payload);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to send email.";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
