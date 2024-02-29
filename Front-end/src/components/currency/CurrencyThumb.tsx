import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../config/hooks";
import { Currency } from "../../models/Currency"
import { getLastExchangeOnOneCurrency } from "../exchange/exchangeSlice";

export default function CurrencyThumb(props: CurrencyProps) {
  const exchangeRate = useAppSelector(state => state.exchanges.selectedExchange);
  const dispatch = useAppDispatch();

  useEffect((() => {
    dispatch(getLastExchangeOnOneCurrency(props.currency.id!));
  }));

  return (
    <div className="rounded mx-auto d-flex justify-content-between">
      <p>{props.currency.name}</p>
      <p>vaut <strong>{exchangeRate?.rate}€</strong></p>
    </div>
  )
}

interface CurrencyProps {
  currency: Currency;
}