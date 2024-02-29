import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import CurrencyDetails from "../pages/CurrencyDetails";
import CurrencyList from "../components/currency/CurrencyList";
import Article from "../pages/Article";
import Account from "../pages/Account";
import Curves from "../components/exchange/Curves";
import SignForm from "../pages/SignForm";

export const router = createBrowserRouter([
    {
        path: "/", element: <App />, children: [
            { path: "/", element: <Home /> },
            { path: "/sign", element: <SignForm /> },
            { path: "/currency/:id", element: <CurrencyDetails /> },
            { path: "/currency-list", element: <CurrencyList /> },
            { path: "/article/:id", element: <Article /> },
            { path: "/account", element: <Account /> },
            { path: "/curves", element: <Curves /> }
        ]
    }
]);