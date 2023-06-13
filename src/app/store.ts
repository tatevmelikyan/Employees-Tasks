import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import employeesReducer from '../features/employees/slice';
import employeeReducer from '../features/employee/slice';
import tasksReducer from '../features/tasks/slice'

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    employee: employeeReducer,
    tasks: tasksReducer
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
