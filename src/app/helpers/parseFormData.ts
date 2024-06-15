type Items = {
  itemDescription: string;
  quantity: number;
  itemCost: number;
}[];

type GeneralQuoteDetails = {
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

type ParsedFormData = GeneralQuoteDetails & {
  quoteItems: Items;
};

export default function parseFormData(formData: FormData) {
  const formObject = Object.fromEntries(formData);
  const generalQuoteDetails: GeneralQuoteDetails = {
    attention: formObject.attention.toString(),
    entity: formObject.entity.toString(),
    dateOfQuotation: new Date(
      formObject.dateOfQuotation.toString().split("-").join("/"),
    ),
    expiryDate: new Date(formObject.expiryDate.toString().split("-").join("/")),
    buildingAndStreetName: formObject.buildingAndStreetName.toString(),
    unitNumber: formObject.unitNumber.toString(),
    postalCode: formObject.postalCode.toString(),
    paymentDeposit:
      formObject.paymentDeposit.toString() === "on" ? true : false,
    paymentCashPaynow:
      formObject.paymentCashPaynow.toString() === "on" ? true : false,
    warrantyPeriod: Number(formObject.warrantyPeriod.toString()),
  };

  const filteredKeys = Object.keys(formObject).filter(
    (key) =>
      key.charAt(0) !== "$" && !isNaN(Number(key.charAt(key.length - 1))),
  );

  let itemArray: Items = [];
  let item: any = {};

  for (let key of filteredKeys) {
    item[key.slice(0, -1)] =
      key.slice(0, -1) === "quantity" || key.slice(0, -1) === "itemCost"
        ? Number(formObject[key])
        : formObject[key];
    if (Object.keys(item).length === 3) {
      itemArray.push(item);
      item = {};
    }
  }

  const parsedFormData: ParsedFormData = {
    ...generalQuoteDetails,
    quoteItems: itemArray,
  };

  return parsedFormData;
}
