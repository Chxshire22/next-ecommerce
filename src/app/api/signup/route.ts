import { db } from "@/app/db/db";
import { users } from "@/app/db/schema";
import validateEmail from "@/app/helpers/validateEmail";
import validatePassword from "@/app/helpers/validatePassword";
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  //read data of req body

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
  //hash password

  const hash = bcrypt.hashSync(password, 8)

  //create user in db

  await db.insert(users).values({
    email,
    password:hash
  })

  //return sth

  return Response.json({});
}
