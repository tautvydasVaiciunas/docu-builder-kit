import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, ArrowRight, Star, Shield } from "lucide-react";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <section className="py-16">
          <div className="container-app">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Simple Pricing</Badge>
              <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Start free and upgrade when you need more features. No hidden fees, cancel anytime.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Free Plan */}
              <Card className="relative">
                <CardHeader>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold">Free</h3>
                    <div className="text-4xl font-bold mt-4">$0<span className="text-lg font-normal text-muted-foreground">/month</span></div>
                    <p className="text-sm text-muted-foreground mt-2">Perfect for getting started</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">3 purchase orders per month</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">PDF & DOCX export</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">Basic industry templates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">Email support</span>
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Includes watermark</span>
                    </li>
                  </ul>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/purchase-order-generator">
                      Get Started Free
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Pro Plan */}
              <Card className="border-primary shadow-large relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                </div>
                <CardHeader>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold">Pro</h3>
                    <div className="text-4xl font-bold mt-4">$19<span className="text-lg font-normal text-muted-foreground">/month</span></div>
                    <p className="text-sm text-muted-foreground mt-2">For growing businesses</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">Unlimited purchase orders</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">Remove watermarks</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">Custom logo upload</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">Auto-numbering sequences</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">Document history & templates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">Email to vendors</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">Priority support</span>
                    </li>
                  </ul>
                  <Button className="w-full">
                    Upgrade to Pro
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              {/* Team Plan */}
              <Card className="relative">
                <CardHeader>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold">Team</h3>
                    <div className="text-4xl font-bold mt-4">$49<span className="text-lg font-normal text-muted-foreground">/month</span></div>
                    <p className="text-sm text-muted-foreground mt-2">For larger organizations</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">Everything in Pro</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">Up to 10 team members</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">Shared templates & vendors</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">Role-based permissions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">Advanced analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">API access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">Dedicated support</span>
                    </li>
                  </ul>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/contact">
                      Contact Sales
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <div className="mt-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              </div>

              <div className="max-w-3xl mx-auto space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
                    <p className="text-sm text-muted-foreground">
                      Yes, you can cancel your subscription at any time. You'll continue to have access 
                      to Pro features until the end of your billing period.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                    <p className="text-sm text-muted-foreground">
                      We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. 
                      All payments are processed securely through Stripe.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">Is my data secure?</h3>
                    <p className="text-sm text-muted-foreground">
                      Absolutely. We use industry-standard encryption and security measures. 
                      Your data is stored securely and we're fully GDPR compliant.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}