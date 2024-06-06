'use client'
import { useFormState } from "react-dom"
import signupAction from "./signupAction"

const Signup = () => {

  const [error, formAction] = useFormState(signupAction,undefined)
  

  return (
    <>
    <h1>Signup</h1>
    <form action={formAction}>
      <input type="email" name="email" id="email" />
      <input type="password" name="password" id="password" />
      <button type="submit">signup</button>
    </form>
    {error && <p>{error}</p>}
    </>
  )
}

export default Signup