export interface VendorFormData {
  // Basic Information
  companyName: string;
  registrationNumber: string;
  email: string;
  phone: string;

  // Location & Industry
  address: string;
  city: string;
  country: string;
  industry: string;
  description: string;

  // Tax & Banking
  taxId: string;
  vatNumber: string;
  bankName: string;
  accountNumber: string;
  swiftCode: string;
  bankAddress: string;

  // Contact
  contactPerson: string;
}

export type FormStep = {
  title: string;
  description: string;
};
