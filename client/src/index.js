import { createRoot } from "react-dom/client";
import React from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
const element = <App />;
root.render(element);
