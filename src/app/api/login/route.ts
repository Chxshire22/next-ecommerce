import { db } from "@/app/db/db";
import { jwtRefresh } from "@/app/db/schema";
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

  console.log(user);

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
    .sign(refreshTokenSecret);

  const hashedToken = bcrypt.hashSync(refreshToken, 8)

  await db.insert(jwtRefresh).values({token:hashedToken, userId: user.id}) //stored the refresh token in the db 

  // Respond with it
  return Response.json({ accessToken, refreshToken });
}
