import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/',
  }),
  endpoints: (builder) => ({
    getAllTodos: builder.mutation({
      query: (username) => ({
        url: `/users/${username}/todos`,
      }),
    }),
    deleteTodo: builder.mutation({
      query: ({ username, todoID }) => ({
        url: `/users/${username}/todos/${todoID}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetAllTodosMutation, useDeleteTodoMutation } = todoApi;
