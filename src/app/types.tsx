export type Items = {
  itemDescription: string;
  quantity: number;
  itemCost: number;
}[];

export type GeneralQuoteDetails = {
  attention: string;
  entity?: string;
  dateOfQuotation: Date;
  expiryDate: Date;
  buildingAndStreetName: string;
  unitNumber?: string;
  postalCode: string;
  paymentDeposit?: boolean;
  paymentCashPaynow?: boolean;
  warrantyPeriod?: number;
};

export type ParsedFormData = GeneralQuoteDetails & {
  quoteItems: Items;
};
