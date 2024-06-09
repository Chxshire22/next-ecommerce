'use client'
import {useFormStatus} from "react-dom";

export default function LogoutBtn() {
	const data = useFormStatus();
	const isLoading = data.pending;

	return (
<button type="submit" disabled={isLoading} className="btn btn-error">Logout</button>

	)
}
