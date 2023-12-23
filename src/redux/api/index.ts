import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./baseQueryWithAuth";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY as string;

export const newsApi = createApi({
  reducerPath: "news",
  baseQuery: baseQueryWithAuth({ baseUrl: "https://newsapi.org/v2/" }),
  keepUnusedDataFor: 0,
  tagTypes: ["News"],
  endpoints: (builder) => ({
    getTopHeadlines: builder.query<NewsResponse, NewsQueryParams>({
      query: ({ pageSize, page }) => {
        const url = `top-headlines?country=in&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`;
        return url;
      }
    })
  })
});

export const weatherApi = createApi({
  reducerPath: "weather",
  baseQuery: baseQueryWithAuth({
    baseUrl: "https://api.openweathermap.org/data/3.0/"
  }),
  keepUnusedDataFor: 0,
  tagTypes: ["Weather"],
  endpoints: (builder) => ({
    getCurrentWeatherData: builder.query<NewsResponse, NewsQueryParams>({
      query: () => {
        const url = `onecall?lat={lat}&lon={lon}&appid={API key}`;
        return url;
      }
    })
  })
});

export const { useGetTopHeadlinesQuery } = newsApi;
export const { useGetCurrentWeatherDataQuery } = weatherApi;
