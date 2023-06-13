import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../types";

interface ITasksState {
  items: ITask[];
  loading: boolean;
  error: null | string;
}

const initialState: ITasksState = {
  items: [],
  loading: false,
  error: null,
};

const fetchAllTasks = createAsyncThunk("tasks/fetchAllTasks", async () => {
  const response = await fetch(
    "https://rocky-temple-83495.herokuapp.com/tasks"
  );
  if (!response.ok) {
    throw new Error("Failed fetching tasks");
  }
  const data = response.json();
  return data;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchAllTasks.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchAllTasks.fulfilled, (state, {payload}) => {
      console.log(payload, 'payload of tasks');
      
      state.loading = false
      state.error = null
      state.items = payload
    })
    .addCase(fetchAllTasks.rejected, (state, {error}) => {
      state.loading = false
      state.error = error.message as string
    })
  },
});

export {fetchAllTasks}

export default tasksSlice.reducer;
