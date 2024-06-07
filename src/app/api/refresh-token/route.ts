import { db } from "@/app/db/db";
import { userSessions } from "@/app/db/schema";
import bcrypt from "bcryptjs";
import * as jose from "jose";
import { eq, and } from "drizzle-orm";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  //Extract data sent in
  const body = await req.json();

  const { oldRefreshToken, issuedAt, userId } = body;

  console.log("POST REQUEST CALLED")
  console.log("ISSUED AT: ", issuedAt)
  // check if oldRefreshToken exists. use issuedAt and userId
  // then validate by using bcrypt

  try {
    const queryForOldToken = await db
      .select()
      .from(userSessions)
      .where(
        and(
          eq(userSessions.tokenIssuedTime, issuedAt),
          eq(userSessions.userId, userId)
        )
      );
      const retrieveOldHashedToken = queryForOldToken[0]
      console.log("OLD TOKEN: ", queryForOldToken)

    if (retrieveOldHashedToken) {
      const isCorrectToken = bcrypt.compareSync(
        oldRefreshToken,
        retrieveOldHashedToken.token
      );

      isCorrectToken
        ? await db
            .delete(userSessions)
            .where(eq(userSessions.token, retrieveOldHashedToken.token))
        : Response.json(
            {
              error: "token was not a match",
            },
            { status: 401 }
          );
    } else {
      throw new Error("token not found");
    }
  } catch (err) {
    console.log("retrieving old hashed token failed: ", err);
    return Response.json(
      {
        error: "token not found",
      },
      {
        status: 401,
      }
    );
  }

  // Create jwt token
  const accessTokenSecret = new TextEncoder().encode(process.env.JWT_SECRET);
  const alg = "HS256";

  const accessToken = await new jose.SignJWT({})
    .setProtectedHeader({ alg })
    .setExpirationTime("15 mins")
    .setSubject(userId.toString())
    .sign(accessTokenSecret);

  const refreshTokenSecret = new TextEncoder().encode(
    process.env.JWT_REFRESH_SECRET
  );
  const refreshToken = await new jose.SignJWT({})
    .setProtectedHeader({ alg })
    .setExpirationTime("4 weeks")
    .setSubject(userId.toString())
    .setIssuedAt()
    .sign(refreshTokenSecret);

  const hashedToken = bcrypt.hashSync(refreshToken, 8);

  // get the issuedAtTime for the refresh cookie
  const { payload } = await jose.jwtVerify(
    refreshToken,
    refreshTokenSecret,
    {}
  );

  await db.insert(userSessions).values({
    token: hashedToken,
    tokenIssuedTime: String(payload.iat),
    userId,
  }); //stored the refresh token in the db

  // set the accessToken and refreshToken in browser
  cookies().set("Authorization", accessToken, {
    secure: true,
    httpOnly: true,
    expires: Date.now() + 15 * 60 * 1000,
    path: "/",
    sameSite: "strict",
  });

  cookies().delete("Refresh")

  cookies().set("Refresh", refreshToken, {
    secure: true,
    httpOnly: true,
    expires: Date.now() + 24 * 60 * 60 * 1000 * 30,
    path: "/",
    sameSite: "strict",
  });
  // Respond with it
  return Response.json({ accessToken, refreshToken });
}
