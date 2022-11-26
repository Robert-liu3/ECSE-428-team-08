import React, { useState } from "react";
import { useGetStockDetailsQuery } from "../../../services/stocksController";
import Grid from "@mui/material/Grid"; // Grid version 1
import "../styles.css";
import { ListItem, Card, Stack, TextField, Button } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Watchlist() {
  const stock = "aapl";
  const { data, isFetching } = useGetStockDetailsQuery(stock);

  const [stocks, setStocks] = useState({
    stocks: [data] * 6,
  });

  const [inputField, setInputField] = useState({
    stock: "",
  });

  const inputsHandler = (e) => {
    setInputField({ [e.target.name]: e.target.value });
  };

  const submitButton = () => {
    alert(inputField.stock);
  };

  return (
    // <div>
    <Stack spacing={2} style={{ display: "flex", justifyContent: "center" }}>
      <Typography variant="h4">My Watchlist</Typography>
      {isFetching ? (
        <></>
      ) : (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(stocks.stocks).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Card style={{ paddingTop: 16 }}>
                <p>{st["Global Quote"]["01. symbol"]}</p>
                <p>{data["Global Quote"]["02. open"]}</p>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Card
        style={{
          padding: 20,
          paddingTop: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 100,
            height: 100,
          }}
        >
          <input
            type="text"
            name="stock"
            onChange={inputsHandler}
            placeholder="Stock Ticker"
            value={inputField.stock}
          />
          <br />
          <button onClick={submitButton}>Add</button>
        </div>
      </Card>
    </Stack>
    // </div>
  );
}
