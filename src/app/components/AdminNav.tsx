import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "../db/db";
import * as jose from "jose";
import { userSessions } from "../db/schema";
import { and, eq } from "drizzle-orm";
import SubmitBtn from "./SubmitBtn";

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
				await db
					.delete(userSessions)
					.where(
						and(
							eq(userSessions.userId, Number(payload.sub)),
							eq(userSessions.tokenIssuedTime, payload.iat!.toString())
						)
					);
			} catch (error) {
				console.error(error);
			}
		}

		cookies().delete("Authorization");
		cookies().delete("Refresh");
		redirect("/login");
	};
	return (

		<nav className="fixed right-4 top-4">
		
			<div className="dropdown dropdown-bottom dropdown-end">
				<div tabIndex={0} role="button" className="btn m-1"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.95" d="M5 17h8m-8-5h14m-8-5h8"/></svg></div>
				<ul
					tabIndex={0}
					className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li>
						<Link href="/protected">Dashboard</Link>
					</li>
					<li>
						<Link href="/protected/generate-quote">Generate Quote</Link>
					</li>
					<li>
						<Link href="/protected/generate-invoice">Generate Invoice</Link>
					</li>
					<li>
						<Link href="/protected/records">Records</Link>
					</li>
					<form
						action={logoutAction}
						className="flex flex-row justify-center items-center my-2"
					>
						<SubmitBtn btnLabel="Logout" btnStyle="btn-error" />
					</form>
				</ul>
			</div>
		</nav>
	);
}
