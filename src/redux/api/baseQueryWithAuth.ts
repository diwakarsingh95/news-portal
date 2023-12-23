import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery
} from "@reduxjs/toolkit/query";

const baseQueryWithAuth = ({ baseUrl }: { baseUrl: string }) => {
  const baseQuery = fetchBaseQuery({ baseUrl });

  const baseQueryOverride: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  > = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
      return result;
    }
    return result;
  };

  return baseQueryOverride;
};

export default baseQueryWithAuth;
