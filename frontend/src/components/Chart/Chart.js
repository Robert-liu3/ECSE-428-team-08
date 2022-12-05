import React from "react";
import { AdvancedChart } from "react-tradingview-embed";
import Watchlist from "./Watchlist/Watchlist";
import "./styles.css";

export default function Charts() {
  // const stock = "aapl";

  // const { data, isFetching } = useGetStockDetailsQuery(stock);

  // console.log(data);

  return (
    <div className="rowC">
      <div className="chart">
        <AdvancedChart
          widgetProps={{
            autosize: false,
            symbol: "AAPL",
            interval: "D",
            timezone: "America/New_York",
            theme: "light",
            style: "1",
            locale: "en",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            hide_side_toolbar: false,
            allow_symbol_change: true,
            watchlist: [
              "CME_MINI:NQ1!",
              "CME_MINI:ES1!",
              "AAPL",
              "GOOGL",
              "TSLA",
              "NVDA",
              "AMD",
              "AMZN",
              "META",
              "MSFT",
              "WMT",
            ],
            container_id: "tradingview_chart_1",
          }}
        />
      </div>
      <div>
        <Watchlist />
      </div>
    </div>
  );
}
