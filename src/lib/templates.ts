import { DocumentData } from "@/components/generator/DocumentForm";

export const industryTemplatePresets: Record<string, DocumentData> = {
  construction: {
    buyer: {
      name: "Skyline Developments LLC",
      address: "245 Market Street\nSuite 900\nDenver, CO 80202",
      email: "procurement@skylinedev.com",
      phone: "(303) 555-0118",
      vatNumber: "US56-8920314",
    },
    vendor: {
      name: "RockSolid Materials Co.",
      address: "782 Quarry Road\nFort Collins, CO 80521",
      email: "orders@rocksolidmaterials.com",
      phone: "(970) 555-2244",
      vatNumber: "US43-2219087",
    },
    lineItems: [
      {
        id: "construction-1",
        description: "Ready-mix concrete - 4000 PSI",
        quantity: 80,
        unitPrice: 135,
        total: 10800,
      },
      {
        id: "construction-2",
        description: "#5 rebar bundles (20 ft length)",
        quantity: 60,
        unitPrice: 42.5,
        total: 2550,
      },
      {
        id: "construction-3",
        description: "Safety equipment set (hard hats, vests, goggles)",
        quantity: 25,
        unitPrice: 68,
        total: 1700,
      },
    ],
    currency: "USD",
    taxRate: 7.5,
    notes:
      "Project: Central Plaza Renovation\nDelivery schedule: Staggered deliveries over 3 weeks\nOn-site contact: foreman@skylinedev.com",
    poNumber: "",
  },
  technology: {
    buyer: {
      name: "Brightlabs Innovations",
      address: "850 Mission Street\nFloor 12\nSan Francisco, CA 94103",
      email: "ops@brightlabs.io",
      phone: "(415) 555-0199",
      vatNumber: "US12-9845203",
    },
    vendor: {
      name: "NextGen Hardware Supply",
      address: "4425 Silicon Parkway\nSan Jose, CA 95134",
      email: "sales@nextgenhardware.com",
      phone: "(408) 555-7788",
      vatNumber: "US87-2314560",
    },
    lineItems: [
      {
        id: "technology-1",
        description: "14\" ultrabook laptops (32GB RAM, 1TB SSD)",
        quantity: 20,
        unitPrice: 1799,
        total: 35980,
      },
      {
        id: "technology-2",
        description: "USB-C docking stations with dual monitor support",
        quantity: 20,
        unitPrice: 229,
        total: 4580,
      },
      {
        id: "technology-3",
        description: "Team collaboration software licenses (annual)",
        quantity: 20,
        unitPrice: 168,
        total: 3360,
      },
    ],
    currency: "USD",
    taxRate: 8.5,
    notes:
      "Include asset tags prior to delivery\nRequired delivery date: May 5, 2024\nPrimary contact: it-procurement@brightlabs.io",
    poNumber: "",
  },
  retail: {
    buyer: {
      name: "Urban Threads Boutique",
      address: "318 Fashion Avenue\nNew York, NY 10018",
      email: "buyers@urbanthreads.co",
      phone: "(212) 555-4470",
      vatNumber: "US98-5671230",
    },
    vendor: {
      name: "Coastal Apparel Distributors",
      address: "115 Harbor Road\nLong Beach, CA 90802",
      email: "orders@coastalapparel.com",
      phone: "(562) 555-8801",
      vatNumber: "US33-7421109",
    },
    lineItems: [
      {
        id: "retail-1",
        description: "Summer linen shirts - assorted sizes",
        quantity: 150,
        unitPrice: 32.5,
        total: 4875,
      },
      {
        id: "retail-2",
        description: "Denim jackets - women's styles",
        quantity: 80,
        unitPrice: 58,
        total: 4640,
      },
      {
        id: "retail-3",
        description: "Accessory packs (belts, scarves, jewelry)",
        quantity: 120,
        unitPrice: 18,
        total: 2160,
      },
    ],
    currency: "USD",
    taxRate: 8.875,
    notes:
      "Requested ship date: April 28, 2024\nLabel cartons with store IDs\nSend ASN to logistics@urbanthreads.co",
    poNumber: "",
  },
  manufacturing: {
    buyer: {
      name: "Precision Auto Components",
      address: "1420 Industrial Drive\nDetroit, MI 48226",
      email: "purchasing@precisionauto.com",
      phone: "(313) 555-6610",
      vatNumber: "US21-6654982",
    },
    vendor: {
      name: "Midwest Steel Fabricators",
      address: "980 Foundry Lane\nToledo, OH 43604",
      email: "sales@mwsteelfab.com",
      phone: "(419) 555-9070",
      vatNumber: "US44-8765201",
    },
    lineItems: [
      {
        id: "manufacturing-1",
        description: "CNC machined aluminum housings",
        quantity: 500,
        unitPrice: 42,
        total: 21000,
      },
      {
        id: "manufacturing-2",
        description: "Precision gear assemblies",
        quantity: 350,
        unitPrice: 58,
        total: 20300,
      },
      {
        id: "manufacturing-3",
        description: "Quality assurance inspection service",
        quantity: 1,
        unitPrice: 2500,
        total: 2500,
      },
    ],
    currency: "USD",
    taxRate: 6,
    notes:
      "Lot traceability required\nInclude certificates of conformity\nDeliver to Dock 3 with 24h notice",
    poNumber: "",
  },
  logistics: {
    buyer: {
      name: "Everline Commerce",
      address: "540 Distribution Way\nMemphis, TN 38118",
      email: "supplychain@everline.com",
      phone: "(901) 555-3300",
      vatNumber: "US65-4789201",
    },
    vendor: {
      name: "SwiftHaul Logistics",
      address: "220 Carrier Loop\nLouisville, KY 40209",
      email: "dispatch@swifthaul.com",
      phone: "(502) 555-7712",
      vatNumber: "US10-3321675",
    },
    lineItems: [
      {
        id: "logistics-1",
        description: "Full truckload service - Southeast region",
        quantity: 12,
        unitPrice: 1450,
        total: 17400,
      },
      {
        id: "logistics-2",
        description: "Cross-docking & palletization",
        quantity: 1,
        unitPrice: 1850,
        total: 1850,
      },
      {
        id: "logistics-3",
        description: "Freight insurance coverage",
        quantity: 12,
        unitPrice: 75,
        total: 900,
      },
    ],
    currency: "USD",
    taxRate: 7,
    notes:
      "Provide tracking portal access\nPickups scheduled Mondays & Thursdays\nBill of lading emailed to logistics@everline.com",
    poNumber: "",
  },
  "professional-services": {
    buyer: {
      name: "Northwind Financial Advisors",
      address: "77 Lakeshore Drive\nChicago, IL 60601",
      email: "operations@northwindfa.com",
      phone: "(312) 555-7844",
      vatNumber: "US73-9982150",
    },
    vendor: {
      name: "Insight Strategy Partners",
      address: "401 Market Plaza\nSuite 1800\nChicago, IL 60606",
      email: "projects@insightstrategy.com",
      phone: "(312) 555-9921",
      vatNumber: "US55-6678910",
    },
    lineItems: [
      {
        id: "professional-services-1",
        description: "Digital transformation roadmap consulting",
        quantity: 1,
        unitPrice: 18500,
        total: 18500,
      },
      {
        id: "professional-services-2",
        description: "On-site stakeholder workshops (2 days)",
        quantity: 1,
        unitPrice: 6500,
        total: 6500,
      },
      {
        id: "professional-services-3",
        description: "Monthly performance review retainer",
        quantity: 6,
        unitPrice: 2200,
        total: 13200,
      },
    ],
    currency: "USD",
    taxRate: 9.5,
    notes:
      "Engagement kickoff: April 15, 2024\nProvide weekly status reports\nInvoices submitted to ap@northwindfa.com",
    poNumber: "",
  },
};

export const industryTemplateNames: Record<string, string> = {
  construction: "Construction",
  technology: "Technology",
  retail: "Retail",
  manufacturing: "Manufacturing",
  logistics: "Logistics",
  "professional-services": "Professional Services",
};
