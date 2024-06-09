import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "../db/db";
import * as jose from "jose";
import {userSessions} from "../db/schema";
import {and, eq} from "drizzle-orm";

export default function AdminNav() {
	const logoutAction = async () => {
		"use server";
		//delete refresh token from the db.
		//first, get the refresh token from the cookie with identifiers like userId and iat
		//then delete the row with that refresh token.
		//then delete the cookies.
		//then redirect to login.

		const refreshCookie = cookies().get("Refresh");
		if (refreshCookie) {
			const refreshToken = refreshCookie.value;

			const refreshTokenSecret = new TextEncoder().encode(
				process.env.JWT_REFRESH_SECRET
			);

			const { payload } = await jose.jwtVerify(
				refreshToken,
				refreshTokenSecret
			);
			try {
				await db.delete(userSessions).where(and(eq(userSessions.userId, Number( payload.sub )), eq(userSessions.tokenIssuedTime, payload.iat!.toString())));
			} catch (error) {
				console.error(error);
			}
		}

		cookies().delete("Authorization");
		cookies().delete("Refresh");
		redirect("/login");
	};
	return (
		<nav>
			<ul>
				<li>
					<Link href="/protected/generate-quote">Generate Quote</Link>
				</li>
				<li>
					<Link href="/protected/generate-invoice">Generate Invoice</Link>
				</li>
				<li>
					<Link href="/protected/records">Records</Link>
				</li>
				<li>
					<form action={logoutAction}>
						<button type="submit">Logout</button>
					</form>
				</li>
			</ul>
		</nav>
	);
}
