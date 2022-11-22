import React from "react";
import { useGetStockDetailsQuery } from "../../../services/stocksController";
import Grid from "@mui/material/Grid"; // Grid version 1
import "../styles.css";
import { ListItem, Card, Stack, TextField, Button } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Watchlist() {
  const stock = "aapl";
  const { data, isFetching } = useGetStockDetailsQuery(stock);

  // const [value, setValue] = useState("");

  //   handleChange(e) {
  //     setValue({ value: e.target.value });
  //  };

  //  keyPress(e) {
  //     if(e.keyCode == 13){
  //        console.log('value', e.target.value);
  //     }
  //  };

  return (
    <div>
      <Stack spacing={2}>
        <Typography
          variant="h4"
          className="container_row"
          style={{ border: 40 }}
        >
          Watchlist
        </Typography>
        {isFetching ? (
          <></>
        ) : (
          <Grid
            container
            // spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            className="container_row"
          >
            {Array.from(Array(6)).map((_, index) => (
              <Grid xs={2} sm={4} md={4} key={index}>
                <ListItem>
                  <Card>
                    <p style={{ padding: 20, paddingBottom: 0 }}>
                      {data["Global Quote"]["01. symbol"]}
                    </p>
                    <p style={{ padding: 20, paddingTop: 0 }}>
                      {data["Global Quote"]["02. open"]}
                    </p>
                  </Card>
                </ListItem>
              </Grid>
            ))}
            <Card style={{ padding: 20, paddingTop: 0 }}>
              <div
                style={{ padding: 20, paddingTop: 0, width: 100, height: 100 }}
              >
                <TextField
                  id="standard-basic"
                  // label="Add More"
                  variant="standard"
                />
                <Button>Add</Button>
              </div>
            </Card>
          </Grid>
        )}
      </Stack>
    </div>
  );
}
