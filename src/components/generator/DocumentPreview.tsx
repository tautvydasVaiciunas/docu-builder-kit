import { DocumentData } from "./DocumentForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DocumentPreviewProps {
  data: DocumentData;
}

export function DocumentPreview({ data }: DocumentPreviewProps) {
  const subtotal = data.lineItems.reduce((sum, item) => sum + item.total, 0);
  const taxAmount = (subtotal * data.taxRate) / 100;
  const grandTotal = subtotal + taxAmount;

  const formatCurrency = (amount: number) => {
    const symbol = data.currency === 'USD' ? '$' : 
                  data.currency === 'EUR' ? '€' : 
                  data.currency === 'GBP' ? '£' : 
                  data.currency === 'CAD' ? 'C$' : '$';
    return `${symbol}${amount.toFixed(2)}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="document-paper min-h-[800px]">
        <CardHeader className="border-b space-y-6 pb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-document-text">PURCHASE ORDER</h1>
              <Badge variant="outline" className="mt-2">
                {data.poNumber || "PO-XXXX-XXX"}
              </Badge>
            </div>
            <div className="text-right">
              <div className="text-sm text-document-muted">Date Issued</div>
              <div className="font-semibold">{new Date().toLocaleDateString()}</div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <div className="space-y-8">
            {/* Buyer and Vendor Information */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-document-text mb-3 text-sm uppercase tracking-wide">Bill To</h3>
                <div className="space-y-1 text-sm">
                  <div className="font-semibold">{data.buyer.name || "Buyer Company Name"}</div>
                  <div className="whitespace-pre-line text-document-muted">
                    {data.buyer.address || "Buyer address"}
                  </div>
                  {data.buyer.email && (
                    <div className="text-document-muted">{data.buyer.email}</div>
                  )}
                  {data.buyer.phone && (
                    <div className="text-document-muted">{data.buyer.phone}</div>
                  )}
                  {data.buyer.vatNumber && (
                    <div className="text-document-muted">VAT: {data.buyer.vatNumber}</div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-document-text mb-3 text-sm uppercase tracking-wide">Vendor</h3>
                <div className="space-y-1 text-sm">
                  <div className="font-semibold">{data.vendor.name || "Vendor Company Name"}</div>
                  <div className="whitespace-pre-line text-document-muted">
                    {data.vendor.address || "Vendor address"}
                  </div>
                  {data.vendor.email && (
                    <div className="text-document-muted">{data.vendor.email}</div>
                  )}
                  {data.vendor.phone && (
                    <div className="text-document-muted">{data.vendor.phone}</div>
                  )}
                  {data.vendor.vatNumber && (
                    <div className="text-document-muted">VAT: {data.vendor.vatNumber}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div>
              <h3 className="font-semibold text-document-text mb-4 text-sm uppercase tracking-wide">Items</h3>
              <div className="border border-document-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-sm">Description</th>
                      <th className="text-right py-3 px-4 font-semibold text-sm">Qty</th>
                      <th className="text-right py-3 px-4 font-semibold text-sm">Unit Price</th>
                      <th className="text-right py-3 px-4 font-semibold text-sm">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.lineItems.length > 0 ? (
                      data.lineItems.map((item, index) => (
                        <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-muted/20"}>
                          <td className="py-3 px-4 text-sm">{item.description || "Item description"}</td>
                          <td className="py-3 px-4 text-sm text-right">{item.quantity}</td>
                          <td className="py-3 px-4 text-sm text-right">{formatCurrency(item.unitPrice)}</td>
                          <td className="py-3 px-4 text-sm text-right font-semibold">{formatCurrency(item.total)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-8 px-4 text-center text-document-muted">
                          No items added yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-72 space-y-2">
                <div className="flex justify-between py-2">
                  <span className="text-document-muted">Subtotal:</span>
                  <span className="font-semibold">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-document-muted">Tax ({data.taxRate}%):</span>
                  <span className="font-semibold">{formatCurrency(taxAmount)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between py-2">
                    <span className="text-lg font-bold">Total:</span>
                    <span className="text-lg font-bold text-primary">{formatCurrency(grandTotal)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            {data.notes && (
              <div>
                <h3 className="font-semibold text-document-text mb-3 text-sm uppercase tracking-wide">Notes</h3>
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-sm whitespace-pre-line text-document-muted">{data.notes}</p>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="border-t pt-6 mt-8">
              <div className="flex justify-between items-center text-xs text-document-muted">
                <div>Generated with PO Suite</div>
                <div>Page 1 of 1</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}