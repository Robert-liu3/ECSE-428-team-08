import { createRoot } from "react-dom/client";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";

import App from "./App";

const root = createRoot(document.getElementById("root"));
const element = (
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
root.render(element);
