type item = {
  itemDescription: string;
  itemQuantity: number;
  itemCost: number;
};

type parsedFormObject = {
  attention: string;
  entity?: string;
  dateOfQuotation: Date;
  expiryDate: Date;
  buildingAndStreetName: string;
  unitNumber?: string;
  postalCode: string;
  paymentDeposit?: boolean;
  paymentCashOption?: boolean;
  warrantyPeriod?: number;
  items: Array<item>;
};

export default function parseFormData(formData: FormData) {
  const formObject = Object.fromEntries(formData);
  //

  console.log(formObject);
}
