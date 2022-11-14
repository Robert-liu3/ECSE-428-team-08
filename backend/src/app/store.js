import { configureStore } from "@reduxjs/toolkit";
import { stocksController } from "../controllers/stocksController";

export default configureStore({
  reducer: {
    [stocksController.reducerPath]: stocksController.reducer,
  },
});
