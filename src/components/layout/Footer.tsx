import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container-app">
        <div className="flex flex-col space-y-6 py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Product</h3>
              <div className="mt-4 space-y-3">
                <Link to="/purchase-order-generator" className="block text-sm text-muted-foreground hover:text-foreground">
                  PO Generator
                </Link>
                <Link to="/templates" className="block text-sm text-muted-foreground hover:text-foreground">
                  Templates
                </Link>
                <Link to="/pricing" className="block text-sm text-muted-foreground hover:text-foreground">
                  Pricing
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-foreground">Resources</h3>
              <div className="mt-4 space-y-3">
                <Link to="/purchase-order-pdf" className="block text-sm text-muted-foreground hover:text-foreground">
                  PDF Export Guide
                </Link>
                <Link to="/po-number-generator" className="block text-sm text-muted-foreground hover:text-foreground">
                  PO Numbering
                </Link>
                <Link to="/purchase-order-vs-invoice" className="block text-sm text-muted-foreground hover:text-foreground">
                  PO vs Invoice
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-foreground">Support</h3>
              <div className="mt-4 space-y-3">
                <Link to="/faq" className="block text-sm text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
                <Link to="/contact" className="block text-sm text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
                <Link to="/help" className="block text-sm text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-foreground">Legal</h3>
              <div className="mt-4 space-y-3">
                <Link to="/privacy" className="block text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="block text-sm text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-8">
            <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
              <p className="text-sm text-muted-foreground">
                © 2024 PO Suite. All rights reserved.
              </p>
              <p className="text-sm text-muted-foreground">
                GDPR-compliant • Secure document generation
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}