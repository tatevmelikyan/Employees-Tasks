import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IEmployee, INewEmployee } from "../../types";


interface EmployeesState {
  items: IEmployee[];
  paginatedItems: IEmployee[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeesState = {
  items: [],
  paginatedItems: [],
  loading: false,
  error: null,
};

const fetchAllEmployees = createAsyncThunk(
  "employees/fetchAllEmployees",
  async () => {
    const response = await fetch(
      "https://rocky-temple-83495.herokuapp.com/employees"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }
    const data = response.json();
    return data;
  }
);

// const fetchEmployeesPerPage = createAsyncThunk(
//   "employees/fetchEmployeesPerPage",
//   async ({
//     currentPage,
//     dataPerPage,
//   }: {
//     currentPage: number;
//     dataPerPage: number;
//   }) => {
//     const response = await fetch(
//       `https://rocky-temple-83495.herokuapp.com/employees?_page=${currentPage}&_limit=${dataPerPage}`
//     );
//     console.log(response, "response");

//     return await response.json();
//   }
// );


const addEmployee = createAsyncThunk(
  'employees/addEmployee',
  async (employee: INewEmployee) => {
    const response = await fetch('https://rocky-temple-83495.herokuapp.com/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });

    if (!response.ok) {
      throw new Error('Failed to add employee.');
    }

    const addedEmployee = await response.json();
    return addedEmployee;
  }
);



const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (employee: IEmployee) => {
    const response = await fetch(
      `https://rocky-temple-83495.herokuapp.com/employees/${employee.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update employee.");
    }
    const updatedEmployee = await response.json();
    return updatedEmployee;
  }
);

const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (employeeId: string) => {
    console.log(employeeId, "id in delete");

    const response = await fetch(
      `https://rocky-temple-83495.herokuapp.com/employees/${employeeId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete employee");
    }
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    paginateEmployees: (state, { payload }) => {
      const { page, limit } = payload;
      state.paginatedItems = state.items.slice(
        (page - 1) * limit,
        page * limit
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllEmployees.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.items = payload;
      })
      .addCase(fetchAllEmployees.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })
      // .addCase(fetchEmployeesPerPage.pending, (state) => {
      //   state.loading = false;
      //   state.error = null;
      // })
      // .addCase(fetchEmployeesPerPage.fulfilled, (state, { payload }) => {
      //   state.loading = false;
      //   state.error = null;
      //   state.pageEmployees = payload;
      // })
      // .addCase(fetchEmployeesPerPage.rejected, (state, { error }) => {
      //   state.loading = false;
      //   state.error = error.message as string;
      // })
      .addCase(addEmployee.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addEmployee.fulfilled, (state, {payload}) => {
        state.loading = false
        state.error = null
        state.items.push(payload)
      })
      .addCase(addEmployee.rejected, (state, {error}) => {
        state.loading = false
        state.error = error.message as string
      })
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateEmployee.fulfilled,
        (state, { payload: updatedEmployee }) => {
          state.loading = false;
          state.error = null;
          const index = state.items.findIndex(
            (employee) => employee.id === updatedEmployee.id
          );
          if (index !== -1) {
            state.items[index] = updatedEmployee;
          }
        }
      )
      .addCase(updateEmployee.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, { meta }) => {
        state.loading = false;
        state.error = null;
        state.items = state.items.filter(
          (employee) => employee.id !== meta.arg
        );
      })
      .addCase(deleteEmployee.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      });
  },
});

export const {paginateEmployees} = employeesSlice.actions;
export {
  fetchAllEmployees,
  // fetchEmployeesPerPage,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};

export default employeesSlice.reducer;
