import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import moment from 'moment';

import { updateTodo } from '../features/todo';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/',
  }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getAllTodos: builder.mutation({
      query: (username) => {
        console.log('getAll called');
        return ({
          url: `/users/${username}/todos`,
        });
      },
      providesTags: ['Todos'],
      // providesTags: (result) => (
      //   // if obtained a list of todos
      //   // subscribe to {type: 'Todos', todo.id} for each todo
      //   // also subscribe to 'Post'
      //   result
      //     ? [...result.map(({ id }) => ({ type: 'Todos', id })), 'Todos']
      //     : ['Todos']
      // ),
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
      invalidatesTags: [{ type: 'Todos', id: 'todoList' }],
    }),
    updateTodo: builder.mutation({
      query: ({ username, todo }) => ({
        url: `/users/${username}/todos/${todo.id}`,
        method: 'PUT',
        body: todo,
      }),
      invalidatesTags: ['Todos'],
      async onCacheEntryAdded({ todo }, { dispatch }) {
        console.log('inside onCacheEntryAdded');
        dispatch(updateTodo({
          ...todo,
          targetDate: moment(todo.targetDate).toISOString(),
        }));
      },
    }),
  }),
});

export const {
  useGetAllTodosMutation, useGetTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation,
} = todoApi;
