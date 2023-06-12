import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IEmployee, ITask } from "../../types";

interface EmployeeState {
  info: IEmployee | null;
  tasks: ITask[];
  loading: "idle" | "loading";
}

const initialState: EmployeeState = {
  info: null,
  tasks: [],
  loading: "idle",
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
      .addCase(fetchEmployee.pending || fetchEmployeeTasks.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchEmployee.fulfilled, (state, { payload }) => {
        state.info = payload;
        state.loading = "idle";
      })
      .addCase(
        fetchEmployee.rejected || fetchEmployeeTasks.rejected,
        (state, { payload }) => {
          state.loading = "idle";
          console.error(payload);
        }
      )
      .addCase(fetchEmployeeTasks.fulfilled, (state, { payload }) => {
        state.tasks = payload;
        state.loading = "idle";
      });
  },
});

export const {} = employeeSlice.actions;
export { fetchEmployee, fetchEmployeeTasks };

export default employeeSlice.reducer;
