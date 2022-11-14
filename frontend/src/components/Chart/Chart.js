import React from "react";
import { AdvancedChart } from "react-tradingview-embed";
import "./styles.css";
import { useGetStockDetailsQuery } from "../../services/stocksController";

export default function Charts() {
  const stock = "aapl";

  const { data, isFetching } = useGetStockDetailsQuery(stock);

  console.log(data);

  return (
    <div>
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
            container_id: "tradingview_chart_1",
          }}
        />
      </div>
    </div>
  );
}
