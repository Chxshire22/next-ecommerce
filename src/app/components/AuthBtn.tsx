import {useFormStatus} from "react-dom";

export default function AuthBtn(){
	const data = useFormStatus();
	const isLoading = data.pending;
	return <button type="submit" disabled={isLoading} className="btn btn-primary">{isLoading? (<span className="loading loading-dots loading-lg"></span>
): "Login"}</button>
}
