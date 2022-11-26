import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const stockApiHeaders = {
  "X-RapidAPI-Key": "269ad0e022msh12866ec518117adp1a29d7jsn05a28dc4f749",
  "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
};

const baseUrl = "https://alpha-vantage.p.rapidapi.com/query";

const createRequest = (url) => ({ url, headers: stockApiHeaders });

export const stocksController = createApi({
  reducerPath: "stocksController",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getStockDetails: builder.query({
      query: (stock) => createRequest(`?function=GLOBAL_QUOTE&symbol=${stock}`),
    }),
  }),
});

export const { useGetStockDetailsQuery } = stocksController;
