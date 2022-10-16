import React from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import stonks from "./images/stonks.png";

function App(props) {
  return (
    <Container maxWidth="lg">
      <AppBar position="static" color="inherit">
        <Typography variant="h2" align="center">
          Stock Market Exchange App
        </Typography>
        <img src={stonks} alt="stonks" height="400" />
      </AppBar>
    </Container>
  );
}

export default App;
