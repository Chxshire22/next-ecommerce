"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function signupAction(
  currentState: any,
  formData: FormData,
): Promise<string> {
  // get data off from
  const email = formData.get("email");
  const password = formData.get("password");

  //send data to our API route
  const res = await fetch(
    `${
      process.env.DEPLOYED_BASE_URL
        ? process.env.DEPLOYED_BASE_URL
        : process.env.DEV_BASE_URL
    }/api/login`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    },
  );

  // console.log(res)

  const json = await res.json();

  if (json.accessToken && json.refreshToken) {
    cookies().set("Authorization", json.accessToken, {
      // secure: true,
      httpOnly: true,
      expires: Date.now() + 15 * 60 * 1000,
      path: "/",
      sameSite: "strict",
    });

    cookies().set("Refresh", json.refreshToken, {
      // secure: true,
      httpOnly: true,
      expires: Date.now() + 24 * 60 * 60 * 1000 * 30,
      path: "/",
      sameSite: "strict",
    });
  }

  if (res.ok) {
    redirect("/protected");
  } else {
    return json.error;
  }
}
