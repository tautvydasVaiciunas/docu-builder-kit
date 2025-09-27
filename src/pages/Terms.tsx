import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="py-16">
          <div className="container-app max-w-3xl space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-medium text-primary">Terms of Service</p>
              <h1 className="text-4xl font-bold tracking-tight">Understand your agreement with PO Suite</h1>
              <p className="text-lg text-muted-foreground">
                Review the legal terms that govern your use of the purchase order generator, templates, and
                integrations.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-2">
              <AccordionItem value="eligibility" className="border rounded-lg px-4">
                <AccordionTrigger>Account eligibility</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  You must be 18 or older and authorized to represent your organization. Accounts are limited to one
                  workspace per legal entity unless otherwise approved.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="usage" className="border rounded-lg px-4">
                <AccordionTrigger>Permitted use</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Use the platform to create, manage, and share purchasing documents. Reverse engineering or
                  reselling our services is prohibited without written consent.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="billing" className="border rounded-lg px-4">
                <AccordionTrigger>Billing &amp; renewals</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Subscriptions renew monthly or annually depending on your plan. Cancel anytime before renewal to
                  avoid future charges. Refunds are handled on a case-by-case basis.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="liability" className="border rounded-lg px-4">
                <AccordionTrigger>Limitation of liability</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  PO Suite is provided "as-is". We are not liable for indirect damages or lost profits. Our total
                  liability is capped at fees paid in the prior 12 months.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <p className="text-sm text-muted-foreground">
              Need a signed MSA or DPA? Email legal@posuite.app and we will share enterprise-ready agreements.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
