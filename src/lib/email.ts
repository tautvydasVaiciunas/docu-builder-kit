import type { DocumentData } from "../types/purchase-order";
import { supabase } from "@/integrations/supabase/client";

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
  const { data, error } = await supabase.functions.invoke<PurchaseOrderEmailResponse>(
    "email-purchase-order",
    {
      body: payload,
    },
  );

  if (error) {
    const context = (error as { context?: unknown })?.context;
    let backendMessage: string | undefined;
    if (typeof context === "string" && context.trim().length > 0) {
      backendMessage = context;
    } else if (typeof context === "object" && context !== null) {
      if ("message" in context && typeof (context as { message?: unknown }).message === "string") {
        backendMessage = (context as { message?: string }).message;
      } else if ("error" in context && typeof (context as { error?: unknown }).error === "string") {
        backendMessage = (context as { error?: string }).error;
      }
    }

    throw new Error(backendMessage || error.message || "Unable to send email.");
  }

  if (!data?.success) {
    throw new Error(data?.message || "Unable to send email.");
  }

  return data;
}
