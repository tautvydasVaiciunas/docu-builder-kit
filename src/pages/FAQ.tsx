import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export default function FAQ() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <section className="py-16">
          <div className="container-app">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Support Center</Badge>
              <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to know about creating professional purchase orders
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="what-is-po">
                  <AccordionTrigger className="text-left">What is a Purchase Order and why do I need one?</AccordionTrigger>
                  <AccordionContent>
                    A Purchase Order (PO) is a commercial document issued by a buyer to a seller indicating types, quantities, and agreed prices for products or services. POs help you:
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Create a paper trail for your purchases</li>
                      <li>Control spending and budget management</li>
                      <li>Establish clear terms with vendors</li>
                      <li>Simplify accounting and tax reporting</li>
                      <li>Protect your business legally</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="po-vs-invoice">
                  <AccordionTrigger className="text-left">What's the difference between a Purchase Order and an Invoice?</AccordionTrigger>
                  <AccordionContent>
                    A Purchase Order is sent BY the buyer TO the seller to request goods/services, while an Invoice is sent BY the seller TO the buyer to request payment. The typical flow is:
                    <ol className="list-decimal list-inside mt-2 space-y-1">
                      <li>Buyer sends Purchase Order to vendor</li>
                      <li>Vendor confirms the order</li>
                      <li>Vendor delivers goods/services</li>
                      <li>Vendor sends Invoice to buyer for payment</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="free-vs-pro">
                  <AccordionTrigger className="text-left">What's included in the free plan vs Pro plan?</AccordionTrigger>
                  <AccordionContent>
                    <strong>Free Plan:</strong> 3 POs per month, PDF/DOCX export, basic templates, includes watermark
                    <br /><br />
                    <strong>Pro Plan ($19/month):</strong> Unlimited POs, remove watermarks, custom logo, auto-numbering, document history, email to vendors, priority support
                    <br /><br />
                    The free plan is perfect for small businesses or occasional use, while Pro is ideal for regular business operations.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="numbering-system">
                  <AccordionTrigger className="text-left">How does the PO numbering system work?</AccordionTrigger>
                  <AccordionContent>
                    Our Pro plan includes automatic PO numbering with customizable sequences:
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Custom prefixes (e.g., "PO-2024-", "PURCHASE-")</li>
                      <li>Sequential numbering with padding (0001, 0002, etc.)</li>
                      <li>Separate sequences for different document types</li>
                      <li>Reset sequences annually or as needed</li>
                    </ul>
                    This helps maintain organized records for accounting and auditing.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="legally-binding">
                  <AccordionTrigger className="text-left">Are purchase orders legally binding?</AccordionTrigger>
                  <AccordionContent>
                    Purchase orders can become legally binding contracts when accepted by the vendor, but this varies by jurisdiction and specific terms. Generally:
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>A PO becomes binding when the vendor accepts it</li>
                      <li>Clear terms and conditions strengthen legal standing</li>
                      <li>Digital acceptance (email confirmation) is typically valid</li>
                      <li>Local laws may have specific requirements</li>
                    </ul>
                    <em>Disclaimer: This information is general guidance only. Consult legal counsel for specific situations.</em>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="export-formats">
                  <AccordionTrigger className="text-left">What file formats can I export to?</AccordionTrigger>
                  <AccordionContent>
                    You can export your purchase orders in multiple formats:
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li><strong>PDF:</strong> Best for sharing, emailing, and archiving (recommended)</li>
                      <li><strong>DOCX:</strong> For further editing in Microsoft Word</li>
                      <li><strong>Print:</strong> Direct browser printing with optimized layout</li>
                    </ul>
                    All formats maintain professional formatting and are business-ready.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="data-security">
                  <AccordionTrigger className="text-left">How secure is my data?</AccordionTrigger>
                  <AccordionContent>
                    We take data security seriously:
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>All data encrypted in transit and at rest</li>
                      <li>Secure cloud infrastructure with regular backups</li>
                      <li>GDPR compliant data handling</li>
                      <li>No data sharing with third parties</li>
                      <li>Regular security audits and updates</li>
                    </ul>
                    Free users' data isn't stored unless they create an account.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="templates">
                  <AccordionTrigger className="text-left">Can I customize templates or create my own?</AccordionTrigger>
                  <AccordionContent>
                    Yes! We offer several customization options:
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li><strong>Pre-built templates:</strong> Industry-specific templates for construction, tech, retail, etc.</li>
                      <li><strong>Logo upload:</strong> Add your company logo (Pro plan)</li>
                      <li><strong>Custom fields:</strong> Modify existing templates to fit your needs</li>
                      <li><strong>Save templates:</strong> Create reusable templates for your business</li>
                    </ul>
                    Pro users can also request custom template creation.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="email-vendors">
                  <AccordionTrigger className="text-left">How does the "Email to Vendor" feature work?</AccordionTrigger>
                  <AccordionContent>
                    Our Pro plan includes direct vendor emailing:
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Send POs directly from the platform</li>
                      <li>PDF automatically attached to email</li>
                      <li>Professional email template</li>
                      <li>Delivery confirmation tracking</li>
                      <li>Email history and audit trail</li>
                    </ul>
                    This streamlines your procurement process and ensures vendors receive orders promptly.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="support">
                  <AccordionTrigger className="text-left">What support options are available?</AccordionTrigger>
                  <AccordionContent>
                    We offer multiple support channels:
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li><strong>Free users:</strong> Email support and documentation</li>
                      <li><strong>Pro users:</strong> Priority email support with faster response times</li>
                      <li><strong>Team users:</strong> Dedicated support channel and phone support</li>
                      <li><strong>All users:</strong> Comprehensive help center and tutorials</li>
                    </ul>
                    Most questions are answered within 24 hours for Pro users.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-12 text-center">
                <p className="text-muted-foreground mb-4">Can't find what you're looking for?</p>
                <a 
                  href="mailto:support@posuite.com" 
                  className="text-primary hover:underline font-medium"
                >
                  Contact our support team
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}