"use server";
import { cookies } from "next/headers";
import parseFormData from "../helpers/parseFormData";
import { redirect } from "next/navigation";

export const submitQuotationFormAction = async (formData: FormData) => {
  const parsedFormData = parseFormData(formData);
  // store parsedFormData into a stringified JSON cookie that the browser can take to create a PDF. when user clicks back or confirm, set the cookie to be deleted.

  console.log("parsedFormData: ", parsedFormData);
  if (parsedFormData) {
    cookies().set("parsedFormData", JSON.stringify(parsedFormData), {
      httpOnly: true,
      path: "/protected/",
      sameSite: "strict",
    });
    redirect("/protected/preview-pdf/");
  }
};
