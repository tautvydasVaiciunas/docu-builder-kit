import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Building, Code, Store, Truck, Factory, Briefcase, ArrowRight } from "lucide-react";

export default function Templates() {
  const templates = [
    {
      id: "construction",
      name: "Construction",
      description: "Perfect for building materials, equipment, and contractor services",
      icon: Building,
      popular: true,
    },
    {
      id: "technology",
      name: "Technology",
      description: "Optimized for software, hardware, and IT service purchases",
      icon: Code,
      popular: true,
    },
    {
      id: "retail",
      name: "Retail",
      description: "Designed for inventory, merchandise, and retail supply chains",
      icon: Store,
      popular: false,
    },
    {
      id: "manufacturing",
      name: "Manufacturing",
      description: "For raw materials, components, and industrial equipment",
      icon: Factory,
      popular: false,
    },
    {
      id: "logistics",
      name: "Logistics",
      description: "Transportation, shipping, and warehouse services",
      icon: Truck,
      popular: false,
    },
    {
      id: "professional-services",
      name: "Professional Services",
      description: "Consulting, legal, marketing, and other professional services",
      icon: Briefcase,
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <section className="py-16">
          <div className="container-app">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Purchase Order Templates</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose from professionally designed templates optimized for your industry. 
                Each template includes relevant fields and formatting.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card key={template.id} className="hover:shadow-medium transition-all">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <template.icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                      </div>
                      {template.popular && (
                        <Badge variant="secondary" className="text-xs">Popular</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {template.description}
                    </p>
                    <Button asChild className="w-full">
                      <Link to={`/purchase-order-generator?template=${template.id}`}>
                        Use Template
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Need a Custom Template?</h2>
                <p className="text-muted-foreground mb-6">
                  Can't find a template that fits your industry? Our Pro plan includes custom template creation 
                  and priority support to help you get exactly what you need.
                </p>
                <Button asChild size="lg">
                  <Link to="/contact">
                    Request Custom Template
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}