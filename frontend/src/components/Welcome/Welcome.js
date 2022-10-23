import React from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import stonks from "../../images/stonks.png";

export default function Welcome() {
    return (
        <Container maxWidth="lg">
        <AppBar position="static" color="inherit">
            <img src={stonks} alt="stonks" height="400" />
        </AppBar>
        </Container>
    );
}