"use server";
import { redirect } from "next/navigation";

export default async function signupAction(currentState:any,formData: FormData):Promise<string> {
  // get data off from
  const email = formData.get("email");
  const password = formData.get("password");

  //send data to our API route
  const res = await fetch(
    `${
      process.env.DEPLOYED_BASE_URL
        ? process.env.DEPLOYED_BASE_URL
        : process.env.DEV_BASE_URL
    }/api/signup`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  const json = await res.json();
  console.log(json);

  //redirect to login if successful
  if (res.ok) {
    redirect("/login");
  }else{
    return json.error
  }
}
