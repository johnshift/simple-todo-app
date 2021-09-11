import { createSlice } from '@reduxjs/toolkit';

const initState = {
  lastID: 2,
  todoList: [
    {
      id: 0, description: 'Todo item #1', done: false, due: new Date().toString(),
    },
    {
      id: 1, description: 'Todo item #2', done: false, due: new Date().toString(),
    },
    {
      id: 2, description: 'Todo item #3', done: false, due: new Date().toString(),
    },
  ],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState: initState,
  reducers: {
    addTodo: (state, { payload }) => {
      const newID = state.lastID + 1;
      state.lastID = newID;
      state.todoList.push({
        id: newID,
        description: payload,
        done: false,
        due: new Date().toString(),
      });
    },
    deleteTodo: (state, { payload }) => {
      state.todoList = state.todoList.filter((todo) => todo.id !== payload.id);
    },
  },
});

export const { addTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
