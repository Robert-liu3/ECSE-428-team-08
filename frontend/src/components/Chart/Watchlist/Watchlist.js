import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid"; // Grid version 1
import "../styles.css";
import { Card, Stack, TextField, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";

// Functions for adding and removing a stock
async function addToWatchList(username, ticker, API_KEY) {
  const result = await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY}`
  ).then((response) => response.json());
  if (result["Note"]) {
    alert("Too many API calls!");
    return;
  }
  if (!result["Global Quote"]["01. symbol"]) {
    alert("Not a valid stock name!");
    return;
  }
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

function uniq(arr) {
  let result = {};
  arr.map((el) => {
    result[el?.ticker] = el;
  });
  return Object.values(result);
}

export default function Watchlist() {
  const API_KEY = "8FF4VNOU6KHZHNIB";

  const [stocks, setStocks] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [curUser, setCurUser] = useState({});

  const [inputField, setInputField] = useState({
    stock: "",
  });

  const inputsHandler = (e) => {
    setInputField({ [e.target.name]: e.target.value });
  };

  const submitButton = () => {
    const ticker = inputField.stock;
    addToWatchList(curUser?._id, ticker, API_KEY);
  };

  useEffect(() => {
    if (isLoading) {
      getInformation();
    }
  });

  async function getInformation() {
    const someUser = sessionStorage.getItem("currentUser");
    await fetch(`http://localhost:5000/getUser/${someUser}`)
      .then((response) => {
        return response.json();
      })
      .then((user) => {
        setCurUser(user);
      })
      .then((someVar) => {
        const promises = curUser?.watchList?.map((stock, index) =>
          fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock}&apikey=${API_KEY}`
          ).then((response) => response.json())
        );

        Promise.all(promises).then((responses) => {
          responses.forEach((response) => {
            if (!response["Note"]) {
              if (response["Global Quote"]["01. symbol"]) {
                let obj = {
                  ticker: response["Global Quote"]["01. symbol"],
                  open: response["Global Quote"]["02. open"],
                };
                stocks.push(obj);
              } else {
                removeFromWatchList(curUser.id, [
                  curUser.watchList[response["Index"]],
                ]);
              }
            } else {
              alert("Too many API calls!");
              return;
            }
          });
          setIsLoading(false);
        });
      });
  }

  if (!isLoading) {
    return (
      <Stack spacing={2} style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h4">My Watchlist: {curUser?._id}</Typography>
        <p>Our API only allows up to 5 calls per minute.</p>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(uniq(stocks)).map((stock, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Card style={{ paddingTop: 16 }}>
                <p>{stock?.ticker}</p>
                <p>{stock?.open}</p>
              </Card>
            </Grid>
          ))}
        </Grid>
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
}
