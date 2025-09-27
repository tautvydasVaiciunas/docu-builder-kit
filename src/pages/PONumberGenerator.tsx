import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

function NumberingBadge({ prefix, nextNumber }: { prefix: string; nextNumber: number }) {
  return (
    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
      {prefix}
      {String(nextNumber).padStart(4, "0")}
    </div>
  );
}

export default function PONumberGenerator() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="py-16">
          <div className="container-app space-y-12">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-medium text-primary">Auto-numbering</p>
              <h1 className="text-4xl font-bold tracking-tight">Generate purchase order numbers that scale</h1>
              <p className="text-lg text-muted-foreground">
                Establish consistent numbering sequences for every business unit. Configure prefixes, digit
                padding, and annual resets—then apply the sequence directly in the PO generator.
              </p>
              <div className="flex items-center gap-3">
                <NumberingBadge prefix="PO-" nextNumber={128} />
                <NumberingBadge prefix="MRO-" nextNumber={42} />
                <NumberingBadge prefix="EU-" nextNumber={5801} />
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Create a numbering preset</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="prefix">Prefix</Label>
                    <Input id="prefix" placeholder="PO-" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="padding">Digits</Label>
                    <Input id="padding" type="number" min={3} placeholder="4" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reset">Reset cadence</Label>
                    <Input id="reset" placeholder="Annually (Jan 1)" />
                  </div>
                  <Button asChild>
                    <Link to="/purchase-order-generator">Apply in generator</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="h-full border-dashed">
                <CardHeader>
                  <CardTitle>Recommended sequences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <div>
                    <h3 className="font-semibold text-foreground">Operations</h3>
                    <p>Use prefixes by location (e.g., NY-PO-) and reset annually to simplify auditing.</p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-semibold text-foreground">Maintenance &amp; MRO</h3>
                    <p>Short prefixes (MRO-) with 5 digits make work orders easy to reference in the field.</p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-semibold text-foreground">Projects</h3>
                    <p>Include the project code (PRJ-204-) to tie POs back to budgets and reporting.</p>
                  </div>
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
