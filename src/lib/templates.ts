import type { DocumentData } from "../types/purchase-order";

export const documentTemplates: Record<string, DocumentData> = {
  construction: {
    buyer: {
      name: "Skyline Builders LLC",
      address: "1020 Market Street\nSuite 500\nDenver, CO 80202",
      email: "procurement@skylinebuilders.com",
      phone: "(303) 555-2190",
      vatNumber: "US45-9876543",
    },
    vendor: {
      name: "Frontier Construction Supply",
      address: "845 Industrial Way\nDenver, CO 80216",
      email: "orders@frontiercs.com",
      phone: "(303) 555-0188",
      vatNumber: "US12-3456789",
    },
    lineItems: [
      {
        id: "construction-item-1",
        description: "Ready-Mix Concrete - 4000 PSI",
        quantity: 50,
        unitPrice: 110,
        total: 5500,
      },
      {
        id: "construction-item-2",
        description: "Structural Steel Beams W12x26",
        quantity: 30,
        unitPrice: 280,
        total: 8400,
      },
      {
        id: "construction-item-3",
        description: "Heavy Equipment Rental - Excavator (weekly)",
        quantity: 2,
        unitPrice: 1800,
        total: 3600,
      },
    ],
    currency: "USD",
    taxRate: 7.5,
    notes:
      "Include certified payroll reports weekly. Delivery to project site staging area by 7:00 AM.",
    poNumber: "",
  },
  technology: {
    buyer: {
      name: "Innovatech Solutions Inc.",
      address: "88 Digital Drive\nSuite 900\nAustin, TX 78701",
      email: "purchasing@innovatech.com",
      phone: "(512) 555-4420",
      vatNumber: "US98-1029384",
    },
    vendor: {
      name: "Nexus IT Procurement",
      address: "412 Silicon Avenue\nSan Jose, CA 95110",
      email: "sales@nexusitproc.com",
      phone: "(408) 555-7788",
      vatNumber: "US32-5647381",
    },
    lineItems: [
      {
        id: "technology-item-1",
        description: "Enterprise SaaS Licenses (Monthly)",
        quantity: 25,
        unitPrice: 79,
        total: 1975,
      },
      {
        id: "technology-item-2",
        description: "Implementation & Integration Services (Hours)",
        quantity: 40,
        unitPrice: 150,
        total: 6000,
      },
      {
        id: "technology-item-3",
        description: "Premium Support & Success Plan (Annual)",
        quantity: 1,
        unitPrice: 2499,
        total: 2499,
      },
    ],
    currency: "USD",
    taxRate: 8.25,
    notes:
      "Onboard users within 30 days of activation. Provide quarterly utilization analytics to the CIO.",
    poNumber: "",
  },
  retail: {
    buyer: {
      name: "Urban Threads Retail Group",
      address: "75 Fashion Avenue\nNew York, NY 10018",
      email: "buying@urbanthreads.com",
      phone: "(212) 555-3490",
      vatNumber: "US76-3344556",
    },
    vendor: {
      name: "Metro Merchandising Co.",
      address: "220 Warehouse Lane\nSecaucus, NJ 07094",
      email: "orders@metromerch.com",
      phone: "(201) 555-6677",
      vatNumber: "US19-8765432",
    },
    lineItems: [
      {
        id: "retail-item-1",
        description: "Point-of-Sale Terminals",
        quantity: 12,
        unitPrice: 850,
        total: 10200,
      },
      {
        id: "retail-item-2",
        description: "Retail Fixture Sets - Denim Wall",
        quantity: 6,
        unitPrice: 495,
        total: 2970,
      },
      {
        id: "retail-item-3",
        description: "Seasonal Window Display Package",
        quantity: 4,
        unitPrice: 325,
        total: 1300,
      },
    ],
    currency: "USD",
    taxRate: 7.875,
    notes:
      "Deliver to flagship store dock between 7 AM - 3 PM. All fixtures must include assembly instructions.",
    poNumber: "",
  },
  manufacturing: {
    buyer: {
      name: "Precision Components Manufacturing",
      address: "5400 Industrial Parkway\nCleveland, OH 44125",
      email: "procurement@precisioncm.com",
      phone: "(216) 555-0120",
      vatNumber: "US55-6677889",
    },
    vendor: {
      name: "Allied Metals & Fasteners",
      address: "1888 Supply Court\nToledo, OH 43604",
      email: "sales@alliedmetals.com",
      phone: "(419) 555-4545",
      vatNumber: "US21-3344556",
    },
    lineItems: [
      {
        id: "manufacturing-item-1",
        description: "Cold Rolled Steel Sheet 16ga (lbs)",
        quantity: 5000,
        unitPrice: 1.12,
        total: 5600,
      },
      {
        id: "manufacturing-item-2",
        description: "CNC Machining Inserts - Carbide",
        quantity: 150,
        unitPrice: 42.5,
        total: 6375,
      },
      {
        id: "manufacturing-item-3",
        description: "Industrial Lubricant - 55 Gallon Drum",
        quantity: 3,
        unitPrice: 895,
        total: 2685,
      },
    ],
    currency: "USD",
    taxRate: 6.75,
    notes:
      "Provide mill certifications with shipment. Partial deliveries accepted with prior approval only.",
    poNumber: "",
  },
  logistics: {
    buyer: {
      name: "Coastal Imports Distribution",
      address: "120 Harbor View Blvd\nCharleston, SC 29401",
      email: "logistics@coastalimports.com",
      phone: "(843) 555-8822",
      vatNumber: "US88-4455667",
    },
    vendor: {
      name: "Atlantic Freight Services",
      address: "900 Portside Drive\nSavannah, GA 31401",
      email: "dispatch@atlanticfreight.com",
      phone: "(912) 555-6030",
      vatNumber: "US66-2233445",
    },
    lineItems: [
      {
        id: "logistics-item-1",
        description: "Full Truckload Transport - Refrigerated",
        quantity: 8,
        unitPrice: 1350,
        total: 10800,
      },
      {
        id: "logistics-item-2",
        description: "Cross-Dock Handling Fees",
        quantity: 8,
        unitPrice: 185,
        total: 1480,
      },
      {
        id: "logistics-item-3",
        description: "Temperature Monitoring & Compliance Reporting",
        quantity: 1,
        unitPrice: 725,
        total: 725,
      },
    ],
    currency: "USD",
    taxRate: 5.0,
    notes:
      "Carrier must provide GPS tracking links prior to departure. Notify receiving dock 2 hours before arrival.",
    poNumber: "",
  },
  "professional-services": {
    buyer: {
      name: "Northbridge Financial Advisors",
      address: "401 Capital Plaza\nSuite 2200\nChicago, IL 60606",
      email: "operations@northbridgefa.com",
      phone: "(312) 555-7300",
      vatNumber: "US23-9988776",
    },
    vendor: {
      name: "BluePeak Consulting Group",
      address: "77 Strategy Lane\nChicago, IL 60601",
      email: "engagements@bluepeakconsulting.com",
      phone: "(312) 555-4499",
      vatNumber: "US10-2233445",
    },
    lineItems: [
      {
        id: "professional-item-1",
        description: "Strategic Planning Workshops (Day)",
        quantity: 3,
        unitPrice: 3800,
        total: 11400,
      },
      {
        id: "professional-item-2",
        description: "Financial Process Assessment (Hours)",
        quantity: 60,
        unitPrice: 185,
        total: 11100,
      },
      {
        id: "professional-item-3",
        description: "Executive Coaching Sessions",
        quantity: 12,
        unitPrice: 325,
        total: 3900,
      },
    ],
    currency: "USD",
    taxRate: 9.5,
    notes:
      "Engagement spans Q2. Submit bi-weekly progress summaries and invoice upon milestone completion.",
    poNumber: "",
  },
};

export type DocumentTemplateId = keyof typeof documentTemplates;

export const getDocumentTemplate = (templateId: string) => documentTemplates[templateId];
