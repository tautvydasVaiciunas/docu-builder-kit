import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link, useParams } from "react-router-dom";
import { Building, Code, Store } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const industries: Record<
  string,
  {
    name: string;
    description: string;
    highlights: string[];
    compliance: string[];
    icon: LucideIcon;
  }
> = {
  construction: {
    name: "Construction",
    description: "Track materials, subcontractors, and change orders with job codes and retention terms.",
    highlights: [
      "Prefill site address and foreman contact",
      "Include lien waiver clauses and insurance requirements",
      "Budget tracking fields for labor vs. materials",
    ],
    compliance: [
      "Supports AIA billing references",
      "Stores COI renewal reminders",
      "Retains records for 7+ years",
    ],
    icon: Building,
  },
  technology: {
    name: "Technology",
    description: "Capture SaaS renewals, hardware SKUs, and SOC/ISO compliance attestation in one template.",
    highlights: [
      "Track license counts and renewal dates",
      "Reference security questionnaires and data residency",
      "Flag auto-renew clauses for approvals",
    ],
    compliance: [
      "GDPR and SOC 2 reminders",
      "Vendor risk owner assignment",
      "Attachment slots for DPAs",
    ],
    icon: Code,
  },
  retail: {
    name: "Retail",
    description: "Manage seasonal inventory, merchandising displays, and vendor chargebacks.",
    highlights: [
      "Segment by store, region, or channel",
      "Include UPC/SKU imports for bulk items",
      "Track promotions and co-op marketing fees",
    ],
    compliance: [
      "Integrates with POS and ERP exports",
      "Supports GS1 barcode references",
      "Keeps audit log for vendor agreements",
    ],
    icon: Store,
  },
};

const defaultIndustry = {
  name: "Purchase Order Template",
  description: "A flexible template ready for any procurement workflow. Customize fields, numbering, and export formats.",
  highlights: [
    "Add buyer and vendor details with one click",
    "Customize currencies, taxes, and payment terms",
    "Invite teammates to review and approve in real time",
  ],
  compliance: [
    "SOC 2 Type II infrastructure",
    "GDPR and CCPA compliant",
    "Regional data hosting options",
  ],
  icon: Building,
};

export default function TemplateIndustry() {
  const { industry = "" } = useParams();
  const info = industries[industry ?? ""] ?? defaultIndustry;
  const Icon = info.icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="py-16">
          <div className="container-app space-y-12">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-4 max-w-3xl">
                <Badge variant="secondary" className="w-fit text-primary">
                  Industry template
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  {info.name}
                </h1>
                <p className="text-lg text-muted-foreground">{info.description}</p>
              </div>
              <Button asChild size="lg">
                <Link to={`/purchase-order-generator?template=${industry ?? "custom"}`}>
                  Use this template
                </Link>
              </Button>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended fields</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  {info.highlights.map((item) => (
                    <div key={item} className="rounded-lg border border-dashed p-3">
                      {item}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Compliance notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  {info.compliance.map((item) => (
                    <div key={item} className="rounded-lg bg-muted/50 p-3">
                      {item}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Implementation tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>Save this template as a preset in the generator to reuse across teams.</p>
                <Separator />
                <p>Connect exports to your ERP or accounting tool via Zapier, Make, or our API.</p>
                <Separator />
                <p>Need a branded PDF or custom approval workflow? Our team can help tailor it.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
