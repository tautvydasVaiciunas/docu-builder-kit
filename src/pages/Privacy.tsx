import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="py-16">
          <div className="container-app max-w-3xl space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-medium text-primary">Privacy Policy</p>
              <h1 className="text-4xl font-bold tracking-tight">Your data, protected and transparent</h1>
              <p className="text-lg text-muted-foreground">
                We built PO Suite with data protection in mind. Review how we collect, store, and process
                information to power your purchasing workflows.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-2">
              <AccordionItem value="collection" className="border rounded-lg px-4">
                <AccordionTrigger>Information we collect</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  We gather account details (name, work email), document metadata, and usage analytics to improve
                  the product. We do not access the contents of your generated purchase orders without consent.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="storage" className="border rounded-lg px-4">
                <AccordionTrigger>Storage &amp; retention</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Data is stored in SOC 2-compliant infrastructure located in the US and EU. Purchase orders are
                  retained for as long as your workspace is active or until you delete them.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="rights" className="border rounded-lg px-4">
                <AccordionTrigger>Your rights</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  You can request access, correction, or deletion of your data at any time by emailing
                  privacy@posuite.app. We respond within 30 days and support GDPR/CCPA requests.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="security" className="border rounded-lg px-4">
                <AccordionTrigger>Security commitments</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  We encrypt data in transit and at rest, run annual penetration tests, and monitor for abnormal
                  access. Enterprise customers may enable SSO and custom data retention policies.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <p className="text-sm text-muted-foreground">
              Questions about privacy? Contact privacy@posuite.app or view our security overview in the Help Center.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
