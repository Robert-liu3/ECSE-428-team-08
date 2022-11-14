import React from "react";

export default function Watchlist() {
  const defaultStock = "aapl";

  const { data, isFetching } = useGetStockDetailsQuery(stock);

  console.log(data);

  return <div></div>;
}
