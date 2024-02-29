import { Alert } from "antd";
import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { signIn, signUp } from "../components/user/userSlice";
import { useAppDispatch } from "../config/hooks";

export default function SignForm() {
  const email = useRef() as React.MutableRefObject<HTMLInputElement>;
  const password = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [failMessage, setFailMessage] = useState("");

  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  const dispatch = useAppDispatch();

  async function submit() {
    const credentials = {
      email : email.current.value,
      password : password.current.value
    };
    
    if (credentials.email !== "" && credentials.password !== "") {
      if (mode === "signin") {
        await dispatch(signIn(credentials));
      } else if (mode === "signup"){
        await dispatch(signUp(credentials));
      }
    } else {
      setFailMessage("Les champs email et password doivent être remplis");
    }
  }

  return (
    <>
      <h1 className="text-center">{mode === "signin" ? "Connexion" : "Inscription"}</h1>
      {failMessage !== "" && <Alert message="Erreur" description={failMessage}></Alert>}
      <form className="lg-w-50 mx-auto" onSubmit={submit}>
        <div className="my-2">
          <label htmlFor="email" className="form-label">Email :</label>
          <input type="email" className="form-control" name="email" ref={email} />
        </div>
        <div className="my-2">
          <label htmlFor="password" className="form-label">Password :</label>
          <input type="password" className="form-control" name="password" ref={password} />
        </div>
        <button className="btn btn-outline-dark">Valider</button>
      </form>
    </>
  )
}