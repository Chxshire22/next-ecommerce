import { db } from "@/app/db/db";
import { userSessions } from "@/app/db/schema";
import validateEmail from "@/app/helpers/validateEmail";
import validatePassword from "@/app/helpers/validatePassword";
import bcrypt from "bcryptjs";
import * as jose from "jose";

export async function POST(req: Request) {
  //Extract data sent in
  const body = await req.json();

  const { email, password } = body;

  //validate data

  if (!validateEmail(email) || !validatePassword(password)) {
    return Response.json(
      {
        error: "Invalid email or password",
      },
      { status: 400 }
    );
  }

  //lookup the user

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });

  if (!user) {
    return Response.json(
      {
        error: "Invalid email or password",
      },
      { status: 400 }
    );
  }


  // compare password

  const isCorrectPassword = bcrypt.compareSync(password, user.password);

  if (!isCorrectPassword) {
    return Response.json(
      {
        error: "Invalid email or password",
      },
      { status: 400 }
    );
  }

  // Create jwt token
  const accessTokenSecret = new TextEncoder().encode(process.env.JWT_SECRET);
  const alg = "HS256";

  const accessToken = await new jose.SignJWT({})
    .setProtectedHeader({ alg })
    .setExpirationTime("15 mins")
    .setSubject(user.id.toString())
    .sign(accessTokenSecret);

  const refreshTokenSecret = new TextEncoder().encode(
    process.env.JWT_REFRESH_SECRET
  );
  const refreshToken = await new jose.SignJWT({})
    .setProtectedHeader({ alg })
    .setExpirationTime("4 weeks")
    .setSubject(user.id.toString())
    .setIssuedAt()
    .sign(refreshTokenSecret);

  // as refresh tokens allow the users to freely access protected routes as long as the cookie exists, we must protect it like a password so tha attackers on our db cannot use the refresh token.
  const hashedToken = bcrypt.hashSync(refreshToken, 8)

  // get the issuedAtTime for the refresh cookie so it can be identified in the db 
  const {payload} = await jose.jwtVerify(refreshToken, refreshTokenSecret,{})

  await db.insert(userSessions).values({token:hashedToken,tokenIssuedTime:String(payload.iat), userId:user.id}) //stored the refresh token in the db 

  // Respond with it
  return Response.json({ accessToken, refreshToken });
}
