import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../config/hooks";
import { getOneCurrency } from "../components/currency/currencySlice";
import CanvasJSReact from '@canvasjs/react-charts'
import { Exchange } from "../models/Exchange";
import { getAllExchangesOnOneCurrency } from "../components/exchange/exchangeSlice";
import { transactCurrency } from "../components/user/userSlice";

export default function CurrencyDetails() {
  const { id } = useParams();
  const amount = useAppSelector(state => state.users.selectedCurrencyAmount);
  const rate = useAppSelector(state => state.currencies.selectedCurrencyRate);
  const currency = useAppSelector(state => state.currencies.selectedCurrency);
  const exchanges = useAppSelector(state => state.exchanges.exchanges);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const transactionQuantity = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (id != undefined) {
      fetchCurrency();
    } else {
      navigate("/");
    }
  });

  async function fetchCurrency() {
    await dispatch(getOneCurrency(id!));
    if (currency === null) {
      navigate("/");
    } else {
      await dispatch(getAllExchangesOnOneCurrency(id!));
      drawChart();
    }
  }

  function drawChart() {
    const dataPoints: { x: Date, y: number }[] = [];

    exchanges.forEach((e: Exchange) => {
      dataPoints.push({
        x: e.datetime,
        y: e.rate
      });
    });

    const chart = new CanvasJSReact.CanvasJS.Chart("chartContainer", {
      animationEnabled: false,
      theme: "light2",
      title: {
        text: "Évolution du marché"
      },
      axisX: {
        title: "Temps"
      },
      axisY: {
        title: "Valeur en €"
      },
      data: [{
        type: "line",
        indexLabelFontSize: 16,
        dataPoints: dataPoints
      }]
    });
    chart.render();
  }


  return (
    <>
      {currency !== null ? <>
        <h1>{currency.name}</h1>
        <p>
          Quantité disponible sur votre portefeuille : <strong>{amount}</strong>
          soit <strong>{ }€</strong> au <strong>{(rate * amount).toFixed(2)}€</strong>
        </p>
        <div className="chartContainer lg-w-50"></div>
        <input type="number" placeholder="Montant" min={0} step={0.01} ref={transactionQuantity} />
        <div className="actions">
          <button className="btn btn-outline-primary" disabled={transactionQuantity.current.value === "0"}
          onClick={() => dispatch(transactCurrency({ currencyId: id!, buyAmount: +transactionQuantity.current.value }))}>Acheter</button>
          <button className="btn btn-outline-danger" 
          onClick={() => dispatch(transactCurrency({ currencyId: id!, buyAmount: -transactionQuantity.current.value }))}>Vendre</button>
        </div>
      </>
        :
        <>
          <h1>Chargement en cours</h1>
        </>
      }
    </>
  )
}