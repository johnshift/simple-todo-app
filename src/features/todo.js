import { createSlice } from '@reduxjs/toolkit';

const initState = {
  value: {
    todoList: [
      {
        id: 1, description: 'Todo item #1', done: false, due: new Date(),
      },
      {
        id: 2, description: 'Todo item #2', done: false, due: new Date(),
      },
      {
        id: 3, description: 'Todo item #3', done: false, due: new Date(),
      },
    ],
  },
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState: initState,
  reducers: {
    addTodo: (state, action) => {
      state.value.todoList.push(action.payload);
    },
  },
});

export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;
