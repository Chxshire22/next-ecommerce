"use server";
import parseFormData from "../helpers/parseFormData";

export const submitQuotationFormAction = async (formData: FormData) => {
  const parsedFormData = parseFormData(formData);
  // maybe turn whole form into client side rendering and store every input into its own key in sessionStorage.
  // store parsedFormData into a stringified JSON cookie that the browser can take to create a PDF. when user clicks back or confirm, set the cookie to be deleted.
  console.log(parsedFormData);
};
