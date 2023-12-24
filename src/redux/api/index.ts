import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./baseQueryWithAuth";
import { NEWS_API_KEY, WEATHER_API_KEY } from "../../utils/constants";

export const newsApi = createApi({
  reducerPath: "news",
  baseQuery: baseQueryWithAuth({ baseUrl: "https://newsapi.org/v2/" }),
  keepUnusedDataFor: 0,
  tagTypes: ["News"],
  endpoints: (builder) => ({
    getTopHeadlines: builder.query<NewsResponse, NewsQueryParams>({
      query: ({ pageSize, page }) => {
        const url = `top-headlines?country=in&pageSize=${pageSize}&page=${page}&apiKey=${NEWS_API_KEY}`;
        return url;
      }
    }),
    getLatestNews: builder.query<NewsResponse, void>({
      query: () => {
        const url = `everything?q=news&sortBy=publishedAtpageSize=100&page=1&apiKey=${NEWS_API_KEY}`;
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
    getCurrentWeatherData: builder.query<NewsResponse, void>({
      query: () => {
        const url = `onecall?lat=28.535517&lon=77.391029&appid=${WEATHER_API_KEY}`;
        return url;
      }
    })
  })
});

export const { useGetTopHeadlinesQuery, useGetLatestNewsQuery } = newsApi;
export const { useGetCurrentWeatherDataQuery } = weatherApi;
