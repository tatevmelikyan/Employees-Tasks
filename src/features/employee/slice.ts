import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IEmployee, ITask } from "../../types";

interface EmployeeState {
  info: IEmployee | null;
  tasks: ITask[];
  loading: boolean;
  error: null | string;
}

const initialState: EmployeeState = {
  info: null,
  tasks: [],
  loading: false,
  error: null,
};

const fetchEmployee = createAsyncThunk<
  IEmployee,
  string,
  { rejectValue: string }
>("employee/fetchEmployee", async (id, { rejectWithValue }) => {
  const response = await fetch(
    `https://rocky-temple-83495.herokuapp.com/employees/${id}`
  );
  if (!response.ok) {
    return rejectWithValue("Failed to fetch employee");
  }
  const employee = await response.json();
  return employee;
});

const fetchEmployeeTasks = createAsyncThunk<
  ITask[],
  string,
  { rejectValue: string }
>("employee/fetchTasks", async (id, { rejectWithValue }) => {
  const response = await fetch(
    `https://rocky-temple-83495.herokuapp.com/tasks?employeeId=${id}`
  );
  if (!response.ok) {
    return rejectWithValue("Failed to fetch employee tasks");
  }
  const employeeTasks = await response.json();
  return employeeTasks;
});
export const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployee.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.info = payload;
      })
      .addCase(fetchEmployee.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(fetchEmployeeTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployeeTasks.fulfilled, (state, { payload }) => {
        state.tasks = payload;
        state.loading = false;
      })
      .addCase(fetchEmployeeTasks.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
  },
});

export { fetchEmployee, fetchEmployeeTasks };

export default employeeSlice.reducer;
