import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../config/hooks";
import { signout } from "./user/userSlice";
import { KeyboardEvent, useRef } from "react";
import { seekCurrency } from "./currency/currencySlice";

export default function Header() {
  const user = useAppSelector(state => state.users.user);
  const dispatch = useAppDispatch();
  const searchInput = useRef() as React.MutableRefObject<HTMLInputElement>;

  function keyDownHandler(e:KeyboardEvent<HTMLInputElement>){
    if (e.currentTarget.value === "Enter"){
      dispatch(seekCurrency(searchInput.current.value));
    }
  }

  return (
    <header>
      <nav className="navbar bg-dark">
        <div className="container-fluid">
          <ul className="navbar nav text-light">
            <li className="nav-item"><Link className="nav-link" to="/"><i className="bi bi-house-fill"></i></Link></li>
            <li className="nav-item"><Link className="nav-link" to="/curves"><i className="bi bi-graph-up"></i></Link></li>
            <li className="nav-item"><input type="text" placeholder="Rechercher cryptomonnaie" onKeyDown={keyDownHandler} ref={searchInput} /></li>
            {user ?
              <>
                <li className="nav-item"><Link className="nav-link" to="/account">Mon compte</Link></li>
                <li className="nav-item"><button className="nav-link" onClick={() => dispatch(signout())}>Se déconnecter</button></li>
              </>
              :
              <>
                <li className="nav-item"><Link className="nav-link" to="/sign?mode=signin">Se connecter</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/sign?mode=signup">S'inscrire</Link></li>
              </>
            }
          </ul>
        </div>
      </nav>
    </header>
  )
}