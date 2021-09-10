import { createSlice } from '@reduxjs/toolkit';

const initState = {
  lastID: 2,
  todoList: [
    {
      id: 0, description: 'Todo item #1', done: false, due: new Date(),
    },
    {
      id: 1, description: 'Todo item #2', done: false, due: new Date(),
    },
    {
      id: 2, description: 'Todo item #3', done: false, due: new Date(),
    },
  ],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState: initState,
  reducers: {
    addTodo: (state, action) => ({
      ...state,
      lastID: state.lastID + 1,
      todoList: [
        ...state.todoList,
        {
          id: state.lastID + 1,
          description: action.payload,
          done: false,
          due: new Date(),
        },
      ],
    }),
    deleteTodo: (state, action) => ({
      ...state,
      todoList: state.todoList.filter((todo) => todo.id !== action.payload.id),
    }),
  },
});

export const { addTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
