import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchEmployees } from "./slice";

const Employees: FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.employees.loading);
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);
  return <div>Employees</div>;
};

export default Employees;
