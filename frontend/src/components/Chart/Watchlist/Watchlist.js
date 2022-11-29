import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid"; // Grid version 1
import "../styles.css";
import { Card, Stack, TextField, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";

// Functions for adding and removing a stock
async function addToWatchList(username, ticker) {
  console.log("In addToWatchList frontend");
  console.log(username, ticker);
  await axios.post(
    `http://localhost:5000/addToWatchList/${username}/${ticker}`,
    null,
    {}
  );
}

async function removeFromWatchList(username, ticker) {
  await axios.delete(
    `http://localhost:5000/removeFromWatchList/${username}/${ticker}`,
    null,
    {}
  );
}

export default function Watchlist() {
  const [isLoading, setIsLoading] = useState({
    isLoading: true,
  });

  const [curUser, setCurUser] = useState({
    curUser: {},
  });

  const [stocks, setStocks] = useState({
    stocks: [],
  });

  const [inputField, setInputField] = useState({
    stock: "",
  });

  const inputsHandler = (e) => {
    setInputField({ [e.target.name]: e.target.value });
  };

  const submitButton = () => {
    const ticker = inputField.stock;
    addToWatchList(curUser.curUser?._id, ticker);
  };

  useEffect(() => {
    if (isLoading.isLoading) {
      getCurrentUser();
    }
  });

  async function fetchStocks(API_CALL, stockList) {
    await fetch(API_CALL)
      .then((response) => response.json())
      .then((stock) => {
        console.log(stock);
        stockList.push(stock["Global Quote"]);
      });
  }

  async function getCurrentUser() {
    const someUser = sessionStorage.getItem("currentUser");
    await fetch(`http://localhost:5000/getUser/${someUser}`)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((user) => {
        console.log(user);
        curUser.curUser = user;
      })
      .then((someVar) => {
        // const stockList = [];
        console.log(curUser.curUser.watchList);

        const API_KEY = "8FF4VNOU6KHZHNIB";

        const promises = curUser?.curUser?.watchList.map((stock) =>
          fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock}&apikey=${API_KEY}`
          ).then((response) => response.json())
        );

        Promise.all(promises).then((responses) => {
          let stockList = [];
          responses.forEach((response) => {
            console.log(response);
            stockList.push(response);
          });

          stocks.stocks = stockList;
          console.log(stocks.stocks);
          isLoading.isLoading = false;
        });

        // fetchStocks(API_CALL, stockList);
      });

    // });
    // console.log(curUser.curUser);
    // isLoading.isLoading = false;
  }
  console.log(curUser);

  // if (!isLoading.isLoading) {
  return (
    <Stack spacing={2} style={{ display: "flex", justifyContent: "center" }}>
      <Typography variant="h4">My Watchlist</Typography>
      {/* {isLoading.isLoading ? (
          <div>Loading...</div>
        ) : ( */}
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
      {/* )} */}
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
  // }
}
