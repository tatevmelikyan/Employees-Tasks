import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IEmployee, ITask } from "../../types";

interface EmployeeState {
  info: IEmployee | null;
  tasks: ITask[];
  loading: boolean;
  error: null | string
}

const initialState: EmployeeState = {
  info: null,
  tasks: [],
  loading: false,
  error: null
};

const fetchEmployee = createAsyncThunk(
  "employee/fetchEmployee",
  async ({ id }: { id: string }) => {
    const response = await fetch(
      `https://rocky-temple-83495.herokuapp.com/employees/${id}`
    );
    return await response.json();
  }
);

const fetchEmployeeTasks = createAsyncThunk(
  "employee/fetchTasks",
  async ({ id }: { id: string }) => {
    const response = await fetch(
      `https://rocky-temple-83495.herokuapp.com/tasks?employeeId=${id}`
    );
    return await response.json();
  }
);
export const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployee.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(fetchEmployee.fulfilled, (state, { payload }) => {
        state.loading = false
        state.info = payload;
      })
      .addCase(
        fetchEmployee.rejected,
        (state, { error }) => {
          state.loading = false;
          state.error = error.message as string
        }
      )
      .addCase(fetchEmployeeTasks.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchEmployeeTasks.fulfilled, (state, { payload }) => {
        state.tasks = payload;
        state.loading = false;
      })
      .addCase(fetchEmployeeTasks.rejected, (state, {error}) => {
        state.loading = false
        state.error = error.message as string
      })
  },
});

export { fetchEmployee, fetchEmployeeTasks };

export default employeeSlice.reducer;
