import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//For getting todo from server
// export const getTodoAsync = createAsyncThunk(
//     'todos/getTodoAsync',
//     async () => {
// 		const resp = await fetch('http://localhost:5000/buddy/todos');
// 		if (resp.ok) {
// 			const todos = await resp.json();
// 			return { todos };
// 		}
// 	}
// )

// export const addTodoAsync = createAsyncThunk(
// 	'todos/addTodoAsync',
// 	async (payload) => {
// 		const resp = await fetch('http://localhost:5000/todos', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({ title: payload.title }),
// 		});

// 		if (resp.ok) {
// 			const todo = await resp.json();
// 			return { todo };
// 		}
// 	}
// );

// export const deleteTodoAsync = createAsyncThunk(
// 	'todos/deleteTodoAsync',
// 	async (payload) => {
// 		const resp = await fetch(`http://localhost:5000/todos/${payload.id}`, {
// 			method: 'DELETE',
// 		});

// 		if (resp.ok) {
// 			return { id: payload.id };
// 		}
// 	}
// );

export const todoSlice = createSlice({
  name: "todos",
  initialState: [
    { id: 1, title: "todo1", date: Date.now() },
    { id: 2, title: "todo2", date: Date.now() },
    { id: 3, title: "todo3", date: Date.now() },
  ],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      };
      state.push(newTodo);
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo !== action.payload.id);
    },
    editTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].title = action.payload.title;
    },
  },
  // extraReducers: {
  //     [getTodoAsync.fulfilled]: (state, action) => {
  //         return action.payload.todos;
  //     },
  //     [addTodoAsync.fulfilled]: (state, action) => {
  //         state.push(action.payload.todo);
  //     },
  // 	[deleteTodoAsync.fulfilled]: (state, action) => {
  // 		return state.filter((todo) => todo.id !== action.payload.id);
  // 	}
  // }
});

export const { addTodo, deleteTodo, editTodo } = todoSlice.actions;

export default todoSlice.reducer;
