import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INewTask, ISearchTaskParams, ITask } from "../../types";

interface ITasksState {
  items: ITask[];
  paginatedItems: ITask[];
  currentPage: number;
  totalPages: number;
  limit: number;
  loading: boolean;
  error: null | string;
}

const initialState: ITasksState = {
  items: [],
  paginatedItems: [],
  currentPage: 1,
  totalPages: 0,
  limit: 3,
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
  const data = await response.json();

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

const searchTask = createAsyncThunk<
  ITask[],
  ISearchTaskParams,
  { rejectValue: string }
>(
  "tasks/searchTask",
  async (
    { name_like, description_like, startDate, endDate },
    { rejectWithValue }
  ) => {
    const queryParams = [
      name_like.length && `name_like=${encodeURIComponent(name_like)}`,
      description_like.length &&
        `description_like=${encodeURIComponent(description_like)}`,
      startDate.length && `startDate=${startDate}`,
      endDate.length && `endDate=${endDate}`,
    ]
      .filter(Boolean)
      .join("&");
    let url = `https://rocky-temple-83495.herokuapp.com/tasks?${queryParams}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error();
      }
    } catch (err) {
      return rejectWithValue("Failed to fetch tasks");
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    paginateTasks: (state, { payload: page }: PayloadAction<number>) => {
      state.paginatedItems = state.items.slice(
        (page - 1) * state.limit,
        page * state.limit
      );
      state.currentPage = page;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTasks.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload;
        state.totalPages = Math.ceil(state.items.length / state.limit);
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
        state.items = state.items.filter((task) => task.id !== payload);
      })
      .addCase(deleteTask.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || "An error occurred.";
      })
      .addCase(searchTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchTask.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload;
      })
      .addCase(searchTask.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || "An error occurred";
      });
  },
});

export { fetchAllTasks, createTask, updateTask, deleteTask, searchTask };
export const { paginateTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
