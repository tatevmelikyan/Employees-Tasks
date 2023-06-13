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
  "tasks/createTask",
  async (task: INewTask) => {
    const response = await fetch(
      "https://rocky-temple-83495.herokuapp.com/tasks",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create task.");
    }

    const createdTask = await response.json();
    return createdTask;
  }
);

const updateTask = createAsyncThunk<ITask, { task: ITask }>(
  "tasks/updateTask",
  async ({ task }) => {
    const response = await fetch(
      `https://rocky-temple-83495.herokuapp.com/tasks/${task.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update task");
    }
    const updatedTask = await response.json();
    return updatedTask;
  }
);

const deleteTask = createAsyncThunk<string, string, { rejectValue: string }>(
  "tasks/deleteTask",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://rocky-temple-83495.herokuapp.com/tasks/${taskId}`,
        {
          method: "DELETE",
        }
      );
      return taskId;
    } catch (error) {
      return rejectWithValue("Failed to delete task");
    }
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
      .addCase(fetchAllTasks.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.items = payload;
      })
      .addCase(fetchAllTasks.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.items.push(payload);
      })
      .addCase(createTask.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, { payload: updatedTask }) => {
        state.loading = false;
        state.error = null;
        const index = state.items.findIndex(
          (task) => task.id === updatedTask.id
        );
        if (index !== -1) {
          state.items[index] = updatedTask;
        }
      })
      .addCase(updateTask.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.items = state.items.filter((task) => task.id !== payload);
      })
      .addCase(deleteTask.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || "An error occurred.";
      });
  },
});

export { fetchAllTasks, createTask, updateTask, deleteTask };

export default tasksSlice.reducer;
