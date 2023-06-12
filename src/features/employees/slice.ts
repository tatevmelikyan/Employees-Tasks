import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { IEmployee } from "../../types";

interface EmployeesState {
  entities: IEmployee[];
  loading: "idle" | "loading";
}

const initialState: EmployeesState = {
  entities: [],
  loading: "idle",
};

const fetchEmployees = createAsyncThunk(
  "employees/fetchAllEmployees",
  async () => {
    const response = await (
      await fetch("https://rocky-temple-83495.herokuapp.com/employees")
    ).json();
    return response;
  }
);
export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, { payload }) => {
        state.entities = payload;
        state.loading = "idle";
      })
      .addCase(fetchEmployees.rejected, (state, { payload }) => {
        state.loading = "idle";
        console.log(payload);
      });
  },
});

export const {} = employeesSlice.actions;
export { fetchEmployees };

export default employeesSlice.reducer;
