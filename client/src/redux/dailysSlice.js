import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//For getting dailys from server
// export const getDailysAsync = createAsyncThunk(
//     'dailys/getDailysAsync',
//     async () => {
// 		const resp = await fetch('http://localhost:5000/buddy/dailys');
// 		if (resp.ok) {
// 			const dailys = await resp.json();
// 			return { dailys };
// 		}
// 	}
// )

export const dailysSlice = createSlice({
  name: "dailys",
  initialState: [
    { id: 1, title: "todo1", completed: false },
    { id: 2, title: "todo2", completed: false },
    { id: 3, title: "todo3", completed: false },
  ],
  reducers: {
    toggleComplete: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
  },
  // extraReducers: {
  //     [getDailysAsync.fulfilled]: (state, action) => {
  //         return action.payload.dailys;
  //     }
  // }
});

export const { toggleComplete } = dailysSlice.actions;

export default dailysSlice.reducer;
