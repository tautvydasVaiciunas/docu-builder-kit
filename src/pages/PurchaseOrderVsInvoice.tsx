import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";

const comparison = [
  {
    label: "Purpose",
    purchaseOrder: "Formal request from buyer to vendor, locks in pricing and delivery expectations.",
    invoice: "Bill issued by vendor after goods/services are delivered, requesting payment.",
  },
  {
    label: "When it's sent",
    purchaseOrder: "Before fulfillment, once internal approvals are complete.",
    invoice: "After fulfillment, once quantities and totals are confirmed.",
  },
  {
    label: "Key fields",
    purchaseOrder: "PO number, buyer/vendor info, itemized list, delivery terms, approval signature.",
    invoice: "Invoice number, PO reference, payment terms, remittance details, tax breakdown.",
  },
  {
    label: "Who issues it",
    purchaseOrder: "Buyer or procurement team.",
    invoice: "Vendor or accounts receivable.",
  },
  {
    label: "Legal status",
    purchaseOrder: "Becomes legally binding once accepted by vendor.",
    invoice: "Records the amount owed and can serve as evidence of debt.",
  },
];

export default function PurchaseOrderVsInvoice() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="py-16">
          <div className="container-app space-y-12">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-medium text-primary">PO vs Invoice</p>
              <h1 className="text-4xl font-bold tracking-tight">Understand the difference between purchase orders and invoices</h1>
              <p className="text-lg text-muted-foreground">
                Purchase orders initiate a commitment, while invoices confirm delivery and request payment. Use this
                guide to align procurement and accounting teams on how each document flows through your process.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Side-by-side comparison</CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-48">Topic</TableHead>
                      <TableHead>Purchase Order</TableHead>
                      <TableHead>Invoice</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparison.map((row) => (
                      <TableRow key={row.label}>
                        <TableCell className="font-medium">{row.label}</TableCell>
                        <TableCell>{row.purchaseOrder}</TableCell>
                        <TableCell>{row.invoice}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>When to create a PO</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>Confirm scope and pricing with the vendor before work begins.</p>
                  <p>Route for approval in procurement or finance based on spend thresholds.</p>
                  <p>Send the PO to the vendor and attach it to your ERP or purchasing system.</p>
                  <Button asChild variant="outline">
                    <Link to="/purchase-order-generator">Generate a PO</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>When to request an invoice</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>Ensure goods have arrived or services are complete and match the PO.</p>
                  <p>Have the vendor reference the original PO number to streamline matching.</p>
                  <p>Verify totals, taxes, and payment terms before sending to accounts payable.</p>
                  <Button asChild>
                    <Link to="/help">View AP checklist</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
