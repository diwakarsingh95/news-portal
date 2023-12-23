import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { newsApi, weatherApi } from "./api";

const rootReducer = combineReducers({
  [newsApi.reducerPath]: newsApi.reducer,
  [weatherApi.reducerPath]: weatherApi.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat([newsApi.middleware, weatherApi.middleware])
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
