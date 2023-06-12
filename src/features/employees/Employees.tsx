import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchEmployees } from "./slice";



const Employees: FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.employees.loading);
  const employees = useAppSelector(state => state.employees.entities)
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);
  return <div>
    <h2>Employees</h2>
{
  employees.map(employee => {
   return <div key={employee.id} className="employee__container">
      <p>ID: {employee.id}</p>
      <p>Name: {employee.name}</p>
      <p>Surname: {employee.surname}</p>
      <p>Email: {employee.email}</p>
      <p>Position: {employee.position}</p>
    </div>
  })
}
  </div>;
};

export default Employees;
