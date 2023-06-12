import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import employeesReducer from '../features/employees/slice';
import employeeReducer from '../features/employee/slice';

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    employee: employeeReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
