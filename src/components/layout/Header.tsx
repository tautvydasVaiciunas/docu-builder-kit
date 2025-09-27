import { Button } from "@/components/ui/button";
import { FileText, Menu } from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-app">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <FileText className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">PO Suite</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <Link 
                to="/purchase-order-generator" 
                className="text-foreground/60 transition-colors hover:text-foreground/80"
              >
                Generator
              </Link>
              <Link 
                to="/templates" 
                className="text-foreground/60 transition-colors hover:text-foreground/80"
              >
                Templates
              </Link>
              <Link 
                to="/pricing" 
                className="text-foreground/60 transition-colors hover:text-foreground/80"
              >
                Pricing
              </Link>
              <Link 
                to="/faq" 
                className="text-foreground/60 transition-colors hover:text-foreground/80"
              >
                FAQ
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Button asChild variant="default" size="sm">
              <Link to="/purchase-order-generator">
                Create PO (Free)
              </Link>
            </Button>
            
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}