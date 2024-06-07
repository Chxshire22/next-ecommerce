import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import * as jose from "jose";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // check for cookie

  const jwtCookie = cookies().get("Authorization");
  let refreshCookie = cookies().get("Refresh");

  const accessTokenSecret = new TextEncoder().encode(process.env.JWT_SECRET);
  if (jwtCookie) {
    const accessToken = jwtCookie.value;
    try {
      const { payload, protectedHeader } = await jose.jwtVerify(
        accessToken,
        accessTokenSecret,
        {}
      );
      console.log("userId: ", payload.sub);
      console.log("protectedHeader: ", protectedHeader);
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else if (!jwtCookie && !refreshCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (refreshCookie) {

    console.log("THIS IS RUNNING")
    // check validity against db
    const refreshToken = refreshCookie.value;
    console.log("refreshToken: ", refreshToken);
    const refreshTokenSecret = new TextEncoder().encode(
      process.env.JWT_REFRESH_SECRET
    );
    const { payload } = await jose.jwtVerify(
      refreshToken,
      refreshTokenSecret,
      {}
    );
    // send a post req to refresh-token to pull out a token with values iat and userId pulled from payload, and use bcrypt to validate that it is the right one.
    // then delete that row, create a new one along with access token
    // send the refresh and access token as response.
    //
    await fetch(
      `${
        process.env.DEPLOYED_BASE_URL
          ? process.env.DEPLOYED_BASE_URL
          : process.env.DEV_BASE_URL
      }/api/refresh-token`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldRefreshToken: refreshToken,
          issuedAt: payload.iat?.toString(),
          userId: payload.sub,
        }),
      }
    );

    // const json = await res.json();
    //  set cookies again for access token and refresh token
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/protected/:path*",
};
