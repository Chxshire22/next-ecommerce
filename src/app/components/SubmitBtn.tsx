"use client";
import { useFormStatus } from "react-dom";

export default function SubmitBtn({
	btnLabel,
	btnStyle,
}: {
	btnLabel: string;
	btnStyle: string;
}) {
	const data = useFormStatus();
	const isLoading = data.pending;
	return (
		<button
			type="submit"
			disabled={isLoading}
			className={`btn ${btnStyle}`}
		>
			{isLoading ? (
				<span className="loading loading-dots loading-lg"></span>
			) : (
				`${btnLabel}`
			)}
		</button>
	);
}
