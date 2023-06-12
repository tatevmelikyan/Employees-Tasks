import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { IEmployee } from "../../types";

interface EmployeeState {
  info: IEmployee | null;
  tasks: [];
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
    console.log(response, "response");

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
        state.loading = "loading";
      })
      .addCase(fetchEmployee.fulfilled, (state, { payload }) => {
        state.info = payload;
        state.loading = "idle";
      })
      .addCase(fetchEmployee.rejected, (state, { payload }) => {
        state.loading = "idle";
        console.error(payload);
      });
  },
});

export const {} = employeeSlice.actions;
export { fetchEmployee };

export default employeeSlice.reducer;
