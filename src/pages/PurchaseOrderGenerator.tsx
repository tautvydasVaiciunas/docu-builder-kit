import { useEffect, useState } from "react";
import { DocumentForm, DocumentData } from "@/components/generator/DocumentForm";
import { DocumentPreview } from "@/components/generator/DocumentPreview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { toast } from "@/components/ui/use-toast";
import { generatePurchaseOrderDOCX, generatePurchaseOrderPDF } from "@/lib/exporters";
import {
  blobToBase64,
  sendPurchaseOrderEmail,
  isPurchaseOrderEmailEnabled,
} from "@/lib/email";
import { documentTemplates } from "@/lib/templates";
import {
  FileText,
  Download,
  Mail,
  CheckCircle,
  Clock, 
  Shield, 
  Zap,
  Users,
  Star,
  ArrowRight
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSearchParams } from "react-router-dom";

const initialData: DocumentData = {
  buyer: {
    name: "",
    address: "",
    email: "",
    phone: "",
    vatNumber: "",
  },
  vendor: {
    name: "",
    address: "",
    email: "",
    phone: "",
    vatNumber: "",
  },
  lineItems: [],
  currency: "USD",
  taxRate: 0,
  notes: "",
  poNumber: "",
};

export default function PurchaseOrderGenerator() {
  const [documentData, setDocumentData] = useState<DocumentData>(initialData);
  const [lastAppliedTemplate, setLastAppliedTemplate] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get("template");

  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [isExportingDOCX, setIsExportingDOCX] = useState(false);
  const [isEmailingVendor, setIsEmailingVendor] = useState(false);
  const emailSupportAvailable = isPurchaseOrderEmailEnabled;

  useEffect(() => {
    if (!templateId) {
      if (lastAppliedTemplate !== null) {
        setLastAppliedTemplate(null);
      }
      return;
    }

    if (templateId === lastAppliedTemplate) {
      return;
    }

    const preset = documentTemplates[templateId];
    if (!preset) {
      return;
    }

    const timestamp = Date.now();
    const normalizedLineItems = preset.lineItems.map((item, index) => {
      const quantity = item.quantity ?? 0;
      const unitPrice = item.unitPrice ?? 0;
      const total = Number((quantity * unitPrice).toFixed(2));
      return {
        ...item,
        id: `${timestamp}-${index}`,
        total,
      };
    });

    setDocumentData({
      ...preset,
      lineItems: normalizedLineItems,
      poNumber: "",
    });
    setLastAppliedTemplate(templateId);

    const formattedName = templateId
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

    toast({
      title: "Template applied",
      description: `${formattedName} preset loaded successfully.`,
    });
  }, [lastAppliedTemplate, templateId]);

  const getFileName = (extension: string) => {
    const base = documentData.poNumber?.trim() || "purchase-order";
    const safe = base.replace(/[^a-zA-Z0-9-_.]+/g, "-");
    return `${safe}.${extension}`;
  };

  const computeTotals = (data: DocumentData) => {
    const subtotal = data.lineItems.reduce((sum, item) => {
      const total = item.total ?? item.quantity * item.unitPrice;
      return sum + total;
    }, 0);
    const taxAmount = subtotal * (data.taxRate / 100);
    return {
      subtotal,
      taxAmount,
      grandTotal: subtotal + taxAmount,
    };
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getErrorMessage = (error: unknown) => {
    if (error instanceof Error && error.message) {
      return error.message;
    }
    return "Something went wrong. Please try again.";
  };

  const handleExportPDF = async () => {
    setIsExportingPDF(true);
    try {
      const blob = await generatePurchaseOrderPDF(documentData);
      downloadBlob(blob, getFileName("pdf"));
      toast({
        title: "PDF exported",
        description: "Your purchase order PDF has been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setIsExportingPDF(false);
    }
  };

  const handleExportDOCX = async () => {
    setIsExportingDOCX(true);
    try {
      const blob = await generatePurchaseOrderDOCX(documentData);
      downloadBlob(blob, getFileName("docx"));
      toast({
        title: "DOCX exported",
        description: "Your purchase order DOCX has been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setIsExportingDOCX(false);
    }
  };

  const handleEmailVendor = async () => {
    if (!emailSupportAvailable) {
      toast({
        title: "Email setup required",
        description:
          "Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable vendor emails.",
        variant: "destructive",
      });
      return;
    }

    if (!documentData.vendor.email) {
      toast({
        title: "Vendor email required",
        description: "Add the vendor's email address before sending the purchase order.",
        variant: "destructive",
      });
      return;
    }

    setIsEmailingVendor(true);
    try {
      const pdfBlob = await generatePurchaseOrderPDF(documentData);
      const attachmentBase64 = await blobToBase64(pdfBlob);
      const { grandTotal } = computeTotals(documentData);

      const emailResponse = await sendPurchaseOrderEmail({
        vendorEmail: documentData.vendor.email,
        buyerEmail: documentData.buyer.email || undefined,
        subject: documentData.poNumber
          ? `Purchase Order ${documentData.poNumber}`
          : "Purchase Order",
        message: `Hello ${documentData.vendor.name || "there"},\n\nPlease find the attached purchase order for your records.\n\nThank you.`,
        attachment: {
          filename: getFileName("pdf"),
          contentType: "application/pdf",
          base64: attachmentBase64,
        },
        metadata: {
          poNumber: documentData.poNumber,
          buyerName: documentData.buyer.name,
          vendorName: documentData.vendor.name,
          currency: documentData.currency,
          total: grandTotal,
        },
        document: documentData,
      });

      toast({
        title: "Email sent",
        description:
          emailResponse.message ||
          `Purchase order emailed to ${documentData.vendor.email}.`,
      });
    } catch (error) {
      toast({
        title: "Email failed",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setIsEmailingVendor(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section - Two Column Generator */}
        <section className="py-12 lg:py-16">
          <div className="container-app">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                Free Purchase Order Generator
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                Create Professional Purchase Orders in Minutes
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Generate PDF and DOCX purchase orders instantly. No registration required for free exports.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Left Column - Form */}
              <div className="space-y-6">
                <DocumentForm data={documentData} onChange={setDocumentData} />
                
                {/* Export Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="h-5 w-5" />
                      Export & Share
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Button
                        onClick={handleExportPDF}
                        disabled={isExportingPDF}
                        className="flex items-center gap-2"
                        variant="default"
                      >
                        <FileText className="h-4 w-4" />
                        Export PDF
                      </Button>
                      <Button
                        onClick={handleExportDOCX}
                        variant="outline"
                        disabled={isExportingDOCX}
                        className="flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Export DOCX
                      </Button>
                      <Button
                        onClick={handleEmailVendor}
                        variant="outline"
                        disabled={isEmailingVendor}
                        className="flex items-center gap-2"
                      >
                        <Mail className="h-4 w-4" />
                        Email Vendor
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      Free exports include a subtle watermark. 
                      <span className="text-primary font-medium"> Upgrade to Pro</span> to remove watermarks and unlock additional features.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Preview */}
              <div className="lg:sticky lg:top-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Live Preview</h3>
                    <Badge variant="secondary">Updates in real-time</Badge>
                  </div>
                  <div className="border-2 border-dashed border-muted rounded-lg p-4 bg-muted/20">
                    <DocumentPreview data={documentData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container-app">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Everything You Need for Professional Purchase Orders</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Streamline your procurement process with our comprehensive PO generator
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Auto-numbering</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Automatic PO number generation with customizable sequences and prefixes
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Multiple Formats</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Export to PDF, DOCX, and print-ready formats with professional layouts
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Send to Vendor</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Email purchase orders directly to vendors with delivery tracking
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Industry Templates</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Pre-built templates for construction, retail, manufacturing, and more
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16">
          <div className="container-app">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground">
                Create professional purchase orders in 4 simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-4">
                  1
                </div>
                <h3 className="font-semibold mb-2">Fill the Form</h3>
                <p className="text-sm text-muted-foreground">
                  Enter buyer and vendor details, add line items with quantities and pricing
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-4">
                  2
                </div>
                <h3 className="font-semibold mb-2">Preview & Review</h3>
                <p className="text-sm text-muted-foreground">
                  See your purchase order update in real-time as you type
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-4">
                  3
                </div>
                <h3 className="font-semibold mb-2">Export Document</h3>
                <p className="text-sm text-muted-foreground">
                  Download as PDF or DOCX with professional formatting
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-4">
                  4
                </div>
                <h3 className="font-semibold mb-2">Send to Vendor</h3>
                <p className="text-sm text-muted-foreground">
                  Email directly to vendors or save for your records
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 bg-muted/30">
          <div className="container-app">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-lg text-muted-foreground">
                Start free, upgrade when you need more features
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold">Free</h3>
                    <Badge variant="secondary">No signup required</Badge>
                  </div>
                  <div className="text-3xl font-bold">$0<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
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
                      <span className="text-sm">Basic templates</span>
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Includes watermark</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full">
                    Start Free
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-primary shadow-large">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold">Pro</h3>
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                  <div className="text-3xl font-bold">$19<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
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
                      <span className="text-sm">Document history</span>
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
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="container-app">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to know about purchase orders
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="what-is-po">
                  <AccordionTrigger>What is a Purchase Order?</AccordionTrigger>
                  <AccordionContent>
                    A Purchase Order (PO) is a commercial document issued by a buyer to a seller, indicating types, quantities, and agreed prices for products or services. It serves as a formal request to purchase goods and helps track orders and expenses.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="po-vs-invoice">
                  <AccordionTrigger>What's the difference between a PO and an Invoice?</AccordionTrigger>
                  <AccordionContent>
                    A Purchase Order is sent by the buyer to the seller to request goods/services, while an Invoice is sent by the seller to the buyer to request payment. The PO comes first in the procurement process, followed by the invoice after goods are delivered.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="numbering-system">
                  <AccordionTrigger>How does the PO numbering system work?</AccordionTrigger>
                  <AccordionContent>
                    Our Pro plan includes automatic PO numbering with customizable prefixes (like "PO-2024-") and sequential numbers. This helps you track orders chronologically and maintain organized records for accounting and auditing purposes.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="legally-binding">
                  <AccordionTrigger>Are purchase orders legally binding?</AccordionTrigger>
                  <AccordionContent>
                    Purchase orders can be legally binding documents when accepted by the vendor, creating a contract for the specified goods/services. However, legal requirements vary by jurisdiction. We recommend consulting with legal counsel for specific situations. This tool generates documents for informational purposes.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="export-formats">
                  <AccordionTrigger>What export formats are available?</AccordionTrigger>
                  <AccordionContent>
                    You can export your purchase orders as PDF (recommended for sharing) or DOCX (for further editing in Word). All exports maintain professional formatting and are print-ready. Free exports include a subtle watermark which can be removed with a Pro subscription.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}