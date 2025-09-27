import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { 
  FileText, 
  ArrowRight, 
  Zap, 
  Shield, 
  Clock, 
  CheckCircle,
  Star,
  Users,
  Download
} from "lucide-react";
import heroImage from "@/assets/hero-illustration.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 lg:py-32">
          <div className="container-app">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <Badge variant="outline" className="mb-6 text-sm">
                  Trusted by 10,000+ businesses
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-8">
                  Professional
                  <span className="text-primary"> Purchase Orders</span> in Minutes
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Create, customize, and export professional purchase orders instantly. 
                  No registration required. Start generating POs that look great and work perfectly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button asChild size="lg" className="text-lg px-8">
                    <Link to="/purchase-order-generator">
                      Start Creating Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-lg px-8">
                    <Link to="/templates">
                      Browse Templates
                    </Link>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  No credit card required • 3 free exports per month
                </p>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl transform rotate-3"></div>
                <img 
                  src={heroImage} 
                  alt="Professional purchase order generator interface"
                  className="relative rounded-2xl shadow-large w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Overview */}
        <section className="py-16 bg-muted/30">
          <div className="container-app">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Our PO Generator?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to create professional purchase orders that impress vendors and streamline your procurement
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="pt-8">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Ready in 60 Seconds</h3>
                  <p className="text-muted-foreground">
                    Our streamlined form and sample data feature lets you create professional POs in under a minute
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-8">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Multiple Formats</h3>
                  <p className="text-muted-foreground">
                    Export to PDF, DOCX, or print directly. All formats maintain professional layout and branding
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-8">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Secure & Private</h3>
                  <p className="text-muted-foreground">
                    Your data is processed securely and never stored without permission. GDPR compliant.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Quick Start CTA */}
        <section className="py-16">
          <div className="container-app">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Create Your First Purchase Order?</h2>
                <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                  Join thousands of businesses who trust our generator for their procurement needs. 
                  Start with our free plan - no registration required.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                    <Link to="/purchase-order-generator">
                      <FileText className="mr-2 h-5 w-5" />
                      Create Purchase Order
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-lg px-8 border-primary-foreground/20 hover:bg-primary-foreground/10">
                    <Link to="/pricing">
                      View Pricing
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Popular Templates Preview */}
        <section className="py-16 bg-muted/30">
          <div className="container-app">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Industry-Specific Templates</h2>
              <p className="text-lg text-muted-foreground">
                Choose from professionally designed templates for your industry
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-medium transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    Construction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Optimized for materials, labor, and equipment purchases with compliance fields
                  </p>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to="/templates/construction">
                      Use Template
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-medium transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Zap className="h-4 w-4 text-green-600" />
                    </div>
                    Technology
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Perfect for software, hardware, and IT services with technical specifications
                  </p>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to="/templates/technology">
                      Use Template
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-medium transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Star className="h-4 w-4 text-purple-600" />
                    </div>
                    Retail
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Designed for inventory, merchandise, and retail supply chain purchases
                  </p>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to="/templates/retail">
                      Use Template
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <Button asChild variant="outline" size="lg">
                <Link to="/templates">
                  View All Templates
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
