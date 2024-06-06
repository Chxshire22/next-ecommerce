'use client'
import { useFormState } from "react-dom";
import loginAction from "./loginAction";

const Login = () => {

    const [error, formAction] = useFormState(loginAction, undefined);


  return (
    <>
      <h1>login</h1>
      <form action={formAction}>
        <input type="email" name="email" id="email" />
        <input type="password" name="password" id="password" />
        <button type="submit">login</button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
};

export default Login;
