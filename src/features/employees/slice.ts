import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { IEmployee } from "../../types";

interface EmployeesState {
  employeesTotalNum: number;
  items: IEmployee[];
  loading: "idle" | "loading";
}

const initialState: EmployeesState = {
  employeesTotalNum: 0,
  items: [],
  loading: "idle",
};

const fetchAllEmployees = createAsyncThunk(
  "employees/fetchAllEmployees",
  async () => {
    const response = await fetch(
      "https://rocky-temple-83495.herokuapp.com/employees"
    );
    console.log(response, "response");

    return await response.json();
  }
);

const fetchEmployeesPerPage = createAsyncThunk(
  "employees/fetchEmployeesPerPage",
  async ({
    currentPage,
    dataPerPage,
  }: {
    currentPage: number;
    dataPerPage: number;
  }) => {
    const response = await fetch(
      `https://rocky-temple-83495.herokuapp.com/employees?_page=${currentPage}&_limit=${dataPerPage}`
    );
    console.log(response, "response");

    return await response.json();
  }
);
export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchAllEmployees.pending || fetchEmployeesPerPage.pending,
        (state, action) => {
          state.loading = "loading";
        }
      )
      .addCase(fetchAllEmployees.fulfilled, (state, { payload }) => {
        console.log(payload, "payload");
        state.employeesTotalNum = payload.length;
        state.loading = "idle";
      })
      .addCase(
        fetchAllEmployees.rejected || fetchEmployeesPerPage.rejected,
        (state, { payload }) => {
          state.loading = "idle";
          console.error(payload);
        }
      )
      .addCase(fetchEmployeesPerPage.fulfilled, (state, { payload }) => {
        state.loading = "idle";
        state.items = payload;
      });
  },
});

export const {} = employeesSlice.actions;
export { fetchAllEmployees, fetchEmployeesPerPage };

export default employeesSlice.reducer;
