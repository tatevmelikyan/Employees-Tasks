import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { INewTask, ITask } from "../../types";

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


const createTask = createAsyncThunk(
  'tasks/createTask',
  async (task: INewTask) => {
    const response = await fetch('https://rocky-temple-83495.herokuapp.com/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error('Failed to create task.');
    }

    const createdTask = await response.json();
    return createdTask;
  }
);

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
    .addCase(createTask.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
.    addCase(createTask.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.items.push(payload);
    })
    .addCase(createTask.rejected, (state, {error}) => {
      state.loading = false;
      state.error = error.message as string;
    });
  },
});

export {fetchAllTasks, createTask}

export default tasksSlice.reducer;
