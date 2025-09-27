import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Help() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="py-16">
          <div className="container-app space-y-12">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-medium text-primary">Help Center</p>
              <h1 className="text-4xl font-bold tracking-tight">Get answers fast</h1>
              <p className="text-lg text-muted-foreground">
                Browse setup guides, troubleshooting steps, and procurement best practices. Still stuck? Reach
                out and our team will jump on a call within one business day.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Quick start</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>Create your first purchase order in under five minutes.</p>
                  <p>Invite teammates and manage approval workflows.</p>
                  <Button asChild variant="outline">
                    <Link to="/purchase-order-generator">Launch generator</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Accounts payable checklist</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>Match vendor invoices to outstanding purchase orders.</p>
                  <p>Track receipts and delivery confirmations.</p>
                  <Button asChild>
                    <Link to="/purchase-order-vs-invoice">Compare PO vs invoice</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="export">
                    <AccordionTrigger>How do I export documents?</AccordionTrigger>
                    <AccordionContent>
                      Head to the generator, fill in your details, then choose PDF or DOCX export from the preview
                      pane. The file downloads instantly with your numbering sequence applied.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="numbering">
                    <AccordionTrigger>Can I share numbering presets with my team?</AccordionTrigger>
                    <AccordionContent>
                      Yes. Create a preset on the PO Numbering page, then toggle "Team access". Everyone on your
                      workspace can apply it from the generator sidebar.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="security">
                    <AccordionTrigger>How is my data secured?</AccordionTrigger>
                    <AccordionContent>
                      We encrypt all data in transit and at rest. Enterprise plans offer regional hosting and
                      single sign-on with audit logging.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
