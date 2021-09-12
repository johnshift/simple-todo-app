import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import moment from 'moment';

// import { updateTodo } from '../features/todo';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/',
  }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getAllTodos: builder.mutation({
      query: (username) => ({
        url: `/users/${username}/todos`,
      }),
      providesTags: (result) => (
        // if obtained a list of todos
        // subscribe to {type: 'Todos', todo.id} for each todo
        // also subscribe to 'Post'
        result
          ? [...result.map(({ id }) => ({ type: 'Todos', id })), 'Todos']
          : ['Todos']
      ),
    }),
    getTodo: builder.mutation({
      query: ({ username, todoID }) => ({
        url: `users/${username}/todos/${todoID}`,
      }),
      providesTags: (result, error, { todoID }) => [{ type: 'Todos', id: todoID }],
    }),
    deleteTodo: builder.mutation({
      query: ({ username, todoID }) => ({
        url: `/users/${username}/todos/${todoID}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { todoID }) => [{ type: 'Todos', id: todoID }, 'Todos'],
    }),
    updateTodo: builder.mutation({
      query: ({ todo }) => ({
        url: `/users/${todo.username}/todos/${todo.id}`,
        method: 'PUT',
        body: todo,
      }),
      invalidatesTags: (result, error, { todo }) => [{ type: 'Todos', id: todo.id }, 'Todos'],
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: `/users/${todo.username}/todos/`,
        method: 'POST',
        body: todo,
      }),
      invalidatesTags: (result, error, todo) => [{ type: 'Todos', id: todo.id }, 'Todos'],
    }),
  }),
});

export const {
  useGetAllTodosMutation,
  useGetTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
  useAddTodoMutation,
} = todoApi;
