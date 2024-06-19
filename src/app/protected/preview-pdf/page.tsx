import ReactPDFTemplate from "@/app/components/ReactPDFTemplate";
import { ParsedFormData } from "@/app/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const dataForPDFJson = cookies().get("parsedFormData");
  const cookieValue = dataForPDFJson?.value ? dataForPDFJson.value : null;
  let parsed: ParsedFormData = cookieValue ? JSON.parse(cookieValue) : null;
  if (cookieValue) {
    parsed = JSON.parse(cookieValue);
  } else redirect("/protected/generate-quote");

  return (
    <div>
      <ReactPDFTemplate parsedFormData={parsed} />
    </div>
  );
};

export default page;
