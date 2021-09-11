import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/',
  }),
  endpoints: (builder) => ({
    getWelcomeMessage: builder.mutation({
      query: (name) => ({
        url: `/hello-world/path-variable/${name}`,
      }),
    }),
  }),
});

export const { useGetWelcomeMessageMutation } = userApi;
