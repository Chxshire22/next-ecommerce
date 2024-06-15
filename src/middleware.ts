import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import * as jose from "jose";

export async function middleware(request: NextRequest) {
  // check for cookie

  const jwtCookie = cookies().get("Authorization");
  const refreshCookie = cookies().get("Refresh");

  const accessTokenSecret = new TextEncoder().encode(process.env.JWT_SECRET);
  if (jwtCookie) {
    if (request.nextUrl.pathname === "/login") {
      console.log(jwtCookie);
      return NextResponse.redirect(new URL("/protected", request.url));
    }
    const accessToken = jwtCookie.value;
    try {
      const { payload, protectedHeader } = await jose.jwtVerify(
        accessToken,
        accessTokenSecret,
        {},
      );
      // console.log("userId: ", payload.sub);
      // console.log("protectedHeader: ", protectedHeader);
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else if (
    !jwtCookie &&
    !refreshCookie &&
    request.nextUrl.pathname !== "/login"
  ) {
    // only redirect them to login if they are not already there, and they don't have a refresh token.
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (refreshCookie) {
    if (request.nextUrl.pathname.startsWith("/login")) {
      console.log(refreshCookie);
      return NextResponse.redirect(new URL("/protected", request.url));
    }
    console.log("THIS IS RUNNING");
    const refreshToken = refreshCookie.value;
    const refreshTokenSecret = new TextEncoder().encode(
      process.env.JWT_REFRESH_SECRET,
    );
    const { payload } = await jose.jwtVerify(
      refreshToken,
      refreshTokenSecret,
      {},
    );
    // send a post req to refresh-token to pull out a token with values iat and userId pulled from payload, and use bcrypt to validate that it is the right one.
    // then delete that row, create a new one along with access token
    // send the refresh and access token as response.
    //
    const res = await fetch(
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
      },
    );

    const newTokens = await res.json();

    const response = NextResponse.next();

    response.cookies.set({
      name: "Authorization",
      value: newTokens.newAccessToken,
      expires: Date.now() + 15 * 60 * 1000,
      path: "/",
      httpOnly: true,
      // secure: true,
      sameSite: "strict",
    });
    response.cookies.set({
      name: "Refresh",
      value: newTokens.newRefreshToken,
      expires: Date.now() + 24 * 60 * 60 * 1000 * 30,
      path: "/",
      httpOnly: true,
      // secure: true,
      sameSite: "strict",
    });

    return response;
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/protected/:path*", "/login"],
};
