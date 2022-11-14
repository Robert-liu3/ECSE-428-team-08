import { configureStore } from "@reduxjs/toolkit";
import { stocksController } from "../services/stocksController";

export default configureStore({
  reducer: {
    [stocksController.reducerPath]: stocksController.reducer,
  },
});
