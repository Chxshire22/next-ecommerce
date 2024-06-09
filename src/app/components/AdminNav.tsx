import Link from "next/link";

export default function AdminNav() {
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
			</ul>
		</nav>
	);
}
