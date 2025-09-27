import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="py-16">
          <div className="container-app grid gap-12 lg:grid-cols-[1fr_0.8fr] items-start">
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-sm font-medium text-primary">Contact</p>
                <h1 className="text-4xl font-bold tracking-tight">We're here to help your purchasing team</h1>
                <p className="text-lg text-muted-foreground">
                  Reach out for support, onboarding, or custom template requests. Our response time is under 1
                  business day for all paid plans.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Direct channels</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p>support@posuite.app</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <p>+1 (555) 123-6678 • Mon–Fri 9am-6pm ET</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Enterprise support</p>
                    <p>Dedicated Slack channel and quarterly reviews for Pro+ plans.</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Taylor Evans" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Work email</Label>
                  <Input id="email" type="email" placeholder="taylor@company.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="topic">Topic</Label>
                  <Input id="topic" placeholder="Custom template request" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" rows={4} placeholder="Tell us about your purchasing workflow..." />
                </div>
                <Button className="w-full" type="button">
                  Submit request
                </Button>
                <p className="text-xs text-muted-foreground">
                  By submitting, you agree to our privacy policy and understand we will contact you about your
                  request.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
