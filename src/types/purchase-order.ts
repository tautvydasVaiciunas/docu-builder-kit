export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Party {
  name: string;
  address: string;
  email: string;
  phone: string;
  vatNumber: string;
}

export interface DocumentData {
  buyer: Party;
  vendor: Party;
  lineItems: LineItem[];
  currency: string;
  taxRate: number;
  notes: string;
  poNumber: string;
}
