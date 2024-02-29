import CurrencyThumb from "./CurrencyThumb";
import { useAppSelector } from "../../config/hooks"
import { Currency } from "../../models/Currency";

export default function CurrencyList() {
    const currencies = useAppSelector(state => state.currencies.currencies);

    return (
            <ul className="list-group">
                {currencies.map((c:Currency) => 
                    <li className="list-group-item"><CurrencyThumb currency={c}/></li>
                )}
            </ul>
        )
    }

