import type { DocumentData } from "@/components/generator/DocumentForm";

export interface EmailAttachment {
  filename: string;
  contentType: string;
  base64: string;
}

export interface PurchaseOrderEmailPayload {
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
  document: DocumentData;
}

export interface PurchaseOrderEmailResponse {
  success: boolean;
  message?: string;
}

export async function blobToBase64(blob: Blob) {
  const buffer = await blob.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }
  return btoa(binary);
}

export async function sendPurchaseOrderEmail(
  payload: PurchaseOrderEmailPayload,
): Promise<PurchaseOrderEmailResponse> {
  const response = await fetch("/api/email-purchase-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorMessage = "Unable to send email.";
    try {
      const errorBody = await response.json();
      if (errorBody?.error) {
        errorMessage = errorBody.error;
      }
    } catch {
      // ignore parsing errors
    }
    throw new Error(errorMessage);
  }

  const data = (await response.json()) as PurchaseOrderEmailResponse;
  if (!data?.success) {
    throw new Error(data?.message || "Unable to send email.");
  }
  return data;
}
