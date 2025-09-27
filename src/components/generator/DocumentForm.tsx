import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Shuffle } from "lucide-react";
import type { DocumentData, LineItem } from "../../types/purchase-order";

export type { DocumentData, LineItem } from "../../types/purchase-order";

interface DocumentFormProps {
  data: DocumentData;
  onChange: (data: DocumentData) => void;
}

export function DocumentForm({ data, onChange }: DocumentFormProps) {
  const updateData = (updates: Partial<DocumentData>) => {
    onChange({ ...data, ...updates });
  };

  const updateBuyer = (updates: Partial<DocumentData['buyer']>) => {
    updateData({ buyer: { ...data.buyer, ...updates } });
  };

  const updateVendor = (updates: Partial<DocumentData['vendor']>) => {
    updateData({ vendor: { ...data.vendor, ...updates } });
  };

  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      unitPrice: 0,
      total: 0,
    };
    updateData({ lineItems: [...data.lineItems, newItem] });
  };

  const updateLineItem = (id: string, updates: Partial<LineItem>) => {
    const updatedItems = data.lineItems.map(item => {
      if (item.id === id) {
        const updated = { ...item, ...updates };
        const quantity = Number.isFinite(updated.quantity) ? updated.quantity : 0;
        const unitPrice = Number.isFinite(updated.unitPrice) ? updated.unitPrice : 0;
        updated.quantity = quantity;
        updated.unitPrice = unitPrice;
        updated.total = Number((quantity * unitPrice).toFixed(2));
        return updated;
      }
      return item;
    });
    updateData({ lineItems: updatedItems });
  };

  const removeLineItem = (id: string) => {
    updateData({ lineItems: data.lineItems.filter(item => item.id !== id) });
  };

  const fillSampleData = () => {
    const sampleData: DocumentData = {
      buyer: {
        name: "Acme Corporation",
        address: "123 Business Ave\nSuite 100\nNew York, NY 10001",
        email: "purchasing@acme.com",
        phone: "(555) 123-4567",
        vatNumber: "US123456789",
      },
      vendor: {
        name: "Tech Supplies Ltd.",
        address: "456 Vendor Street\nBuilding B\nSan Francisco, CA 94102",
        email: "sales@techsupplies.com",
        phone: "(555) 987-6543",
        vatNumber: "US987654321",
      },
      lineItems: [
        {
          id: "1",
          description: "Laptop Computer - ThinkPad X1 Carbon",
          quantity: 5,
          unitPrice: 1299.99,
          total: 6499.95,
        },
        {
          id: "2",
          description: "Wireless Mouse - Logitech MX Master 3",
          quantity: 5,
          unitPrice: 99.99,
          total: 499.95,
        },
        {
          id: "3",
          description: "USB-C Docking Station",
          quantity: 5,
          unitPrice: 199.99,
          total: 999.95,
        },
      ],
      currency: "USD",
      taxRate: 8.5,
      notes: "Payment terms: Net 30 days\nDelivery required by: End of quarter\nContact purchasing@acme.com for any questions.",
      poNumber: "PO-2024-001",
    };
    onChange(sampleData);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Purchase Order Details</CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fillSampleData}
              className="flex items-center gap-2"
            >
              <Shuffle className="h-4 w-4" />
              Fill Sample Data
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="poNumber">PO Number</Label>
              <Input
                id="poNumber"
                value={data.poNumber}
                onChange={(e) => updateData({ poNumber: e.target.value })}
                placeholder="PO-2024-001"
              />
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select value={data.currency} onValueChange={(value) => updateData({ currency: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="CAD">CAD ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Accordion type="multiple" defaultValue={["buyer", "vendor", "items"]} className="space-y-4">
        <AccordionItem value="buyer">
          <AccordionTrigger className="text-lg font-semibold">Buyer Information</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="buyerName">Company Name</Label>
                    <Input
                      id="buyerName"
                      value={data.buyer.name}
                      onChange={(e) => updateBuyer({ name: e.target.value })}
                      placeholder="Your Company Name"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="buyerAddress">Address</Label>
                    <Textarea
                      id="buyerAddress"
                      value={data.buyer.address}
                      onChange={(e) => updateBuyer({ address: e.target.value })}
                      placeholder="Street address, city, state, postal code"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="buyerEmail">Email</Label>
                    <Input
                      id="buyerEmail"
                      type="email"
                      value={data.buyer.email}
                      onChange={(e) => updateBuyer({ email: e.target.value })}
                      placeholder="contact@company.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="buyerPhone">Phone</Label>
                    <Input
                      id="buyerPhone"
                      value={data.buyer.phone}
                      onChange={(e) => updateBuyer({ phone: e.target.value })}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="buyerVat">VAT/Tax Number</Label>
                    <Input
                      id="buyerVat"
                      value={data.buyer.vatNumber}
                      onChange={(e) => updateBuyer({ vatNumber: e.target.value })}
                      placeholder="US123456789"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="vendor">
          <AccordionTrigger className="text-lg font-semibold">Vendor Information</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="vendorName">Vendor Name</Label>
                    <Input
                      id="vendorName"
                      value={data.vendor.name}
                      onChange={(e) => updateVendor({ name: e.target.value })}
                      placeholder="Vendor Company Name"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="vendorAddress">Address</Label>
                    <Textarea
                      id="vendorAddress"
                      value={data.vendor.address}
                      onChange={(e) => updateVendor({ address: e.target.value })}
                      placeholder="Vendor address"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="vendorEmail">Email</Label>
                    <Input
                      id="vendorEmail"
                      type="email"
                      value={data.vendor.email}
                      onChange={(e) => updateVendor({ email: e.target.value })}
                      placeholder="vendor@company.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vendorPhone">Phone</Label>
                    <Input
                      id="vendorPhone"
                      value={data.vendor.phone}
                      onChange={(e) => updateVendor({ phone: e.target.value })}
                      placeholder="(555) 987-6543"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="vendorVat">VAT/Tax Number</Label>
                    <Input
                      id="vendorVat"
                      value={data.vendor.vatNumber}
                      onChange={(e) => updateVendor({ vatNumber: e.target.value })}
                      placeholder="US987654321"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="items">
          <AccordionTrigger className="text-lg font-semibold">Line Items</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {data.lineItems.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-12 gap-2 items-end p-4 border rounded-lg">
                      <div className="col-span-5">
                        <Label>Description</Label>
                        <Input
                          value={item.description}
                          onChange={(e) => updateLineItem(item.id, { description: e.target.value })}
                          placeholder="Item description"
                        />
                      </div>
                      <div className="col-span-2">
                        <Label>Quantity</Label>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            const nextQuantity = parseFloat(e.target.value);
                            updateLineItem(item.id, {
                              quantity: Number.isFinite(nextQuantity) ? nextQuantity : 0,
                            });
                          }}
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <div className="col-span-2">
                        <Label>Unit Price</Label>
                        <Input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) => updateLineItem(item.id, { unitPrice: parseFloat(e.target.value) || 0 })}
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <div className="col-span-2">
                        <Label>Total</Label>
                        <Input
                          value={item.total.toFixed(2)}
                          readOnly
                          className="bg-muted"
                        />
                      </div>
                      <div className="col-span-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeLineItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addLineItem}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Line Item
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tax">
          <AccordionTrigger className="text-lg font-semibold">Tax & Notes</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      value={data.taxRate}
                      onChange={(e) => updateData({ taxRate: parseFloat(e.target.value) || 0 })}
                      min="0"
                      max="100"
                      step="0.1"
                      placeholder="8.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={data.notes}
                      onChange={(e) => updateData({ notes: e.target.value })}
                      placeholder="Payment terms, delivery instructions, etc."
                      rows={4}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}