import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // check for cookie

  const jwtCookie = cookies().get("Authorization");
  const refreshCookie = cookies().get("Refresh")

  if(!refreshCookie){
    return NextResponse.redirect(new URL("/login",request.url))
  }

  if(refreshCookie){
    const 
  }

  if (!jwtCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // validate it
  const accessTokenSecret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = jwtCookie.value;

  try {
    const { payload, protectedHeader } = await jose.jwtVerify(jwt, accessTokenSecret, {});
    console.log("userId: ", payload.sub)
    console.log("protectedHeader: ", protectedHeader)

  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/protected/:path*",
};
