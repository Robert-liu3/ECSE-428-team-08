import React, { useState } from "react";
import { useGetStockDetailsQuery } from "../../../services/stocksController";
import Grid from "@mui/material/Grid"; // Grid version 1
import "../styles.css";
import { Card, Stack, TextField, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";

// Functions for adding and removing a stock
async function addToWatchList(userId, ticker) {
  await axios.post("http://localhost:5000/user/addToWatchList", null, {
    params: {
      userId: userId,
      ticker: ticker,
    },
  });
}

async function removeFromWatchList(userId, ticker) {
  await axios.delete("http://localhost:5000/user/removeFromWatchList", null, {
    params: {
      userId: userId,
      ticker: ticker,
    },
  });
}

// get a random user
async function getRandomUser() {
  let user = await axios.get("http://localhost:5000/getUser/Noah2", {
    params: {
      username: "Noah2",
    },
  });
  // console.log("from the frontend: " + user.data);
  return user.data;
}

export default function Watchlist() {
  const user = {
    watchList: ["aapl", "tsla"],
    _id: "Noah2",
    firstName: "Atrup",
    lastName: "Ram",
    email: "noah@outlook.com",
    profileBio: '"I like to ball"',
    image: "dog",
    password: "123",
    createdAt: "2022-10-30T06:37:24.424Z",
    updatedAt: "2022-11-26T05:33:13.154Z",
    __v: 105,
    likedArticles: ["637933ef0621265471d02b20"],
  };

  const [stocks, setStocks] = useState({
    stocks: [],
  });

  const fetchStock = (stock) => {
    const API_KEY = "8FF4VNOU6KHZHNIB";
    const API_CALL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock}&apikey=${API_KEY}`;

    fetch(API_CALL).then(function (response) {
      return response.json();
    });
  };

  const fillStockList = () => {
    for (const stock of user.watchList) {
      console.log(stock);
      stocks.stocks.push(fetchStock(stock));
    }
  };

  fillStockList();

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
    <Stack spacing={2} style={{ display: "flex", justifyContent: "center" }}>
      <Typography variant="h4">My Watchlist</Typography>
      {stocks.stocks != [] ? (
        <></>
      ) : (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(stocks.stocks).map((stock, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Card style={{ paddingTop: 16 }}>
                <p>{stock["Global Quote"]["01. symbol"]}</p>
                <p>{stock["Global Quote"]["02. open"]}</p>
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
  );
}
