import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

export default function PurchaseOrderPDF() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="py-16">
          <div className="container-app grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <div>
              <p className="text-sm font-medium text-primary">PDF Export Guide</p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight">Export purchase orders as polished PDFs</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Use this quick worksheet to prep your document and learn best practices for exporting from
                the generator. Share compliant, branded PDFs with vendors in seconds.
              </p>

              <div className="mt-8 grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick export checklist</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="po-number">PO Number</Label>
                      <Input id="po-number" placeholder="PO-2024-1042" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="vendor">Vendor name</Label>
                      <Input id="vendor" placeholder="Acme Supplies" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="notes">Internal notes</Label>
                      <Textarea id="notes" placeholder="Remind vendor to confirm delivery date." rows={3} />
                    </div>
                    <Button asChild>
                      <Link to="/purchase-order-generator">Open generator</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Export pro tips</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-3 text-sm text-muted-foreground">
                    <p>
                      • Fill in all buyer and vendor contact details before exporting to avoid manual edits.
                    </p>
                    <p>
                      • Use the logo uploader for brand consistency, then download as PDF or DOCX depending on
                      vendor preference.
                    </p>
                    <p>
                      • Enable auto-numbering in Pro plans to keep PDF filenames and document sequences aligned.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-xl">FAQ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-sm">
                <div>
                  <h3 className="font-semibold text-foreground">Can I download without watermarks?</h3>
                  <p className="text-muted-foreground">
                    Yes—upgrade to the Pro plan to remove the default watermark and unlock custom branding.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Do vendors need special software?</h3>
                  <p className="text-muted-foreground">
                    No. PDFs generated here are standards compliant and open in any modern viewer or browser.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Where are files stored?</h3>
                  <p className="text-muted-foreground">
                    Exported PDFs are generated in-browser. Save locally or to your document management system.
                  </p>
                </div>
                <Button asChild className="w-full">
                  <Link to="/purchase-order-generator">Create my PO</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
