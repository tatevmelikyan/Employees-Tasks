import React, { FC, useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAllEmployees, fetchEmployeesPerPage } from "./slice";
import Pagination from "../pagination/Pagination";

const Employees: FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.employees.loading);
  const employees = useAppSelector((state) => state.employees.items);
  const employeesTotalNum = useAppSelector(
    (state) => state.employees.employeesTotalNum
  );
  const [dataPerPage, setDataPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchEmployeesPerPage({ currentPage: currentPage, dataPerPage }));
  }, [dispatch, currentPage, dataPerPage]);

  return (
    <div>
      <h2>Employees</h2>
      {employees.map((employee) => {
        return (
          <div key={employee.id} className="employee__container">
            <p>ID: {employee.id}</p>
            <p>Name: {employee.name}</p>
            <p>Surname: {employee.surname}</p>
            <p>Email: {employee.email}</p>
            <p>Position: {employee.position}</p>
          </div>
        );
      })}
      <Pagination
        totalData={employeesTotalNum}
        dataPerPage={dataPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Employees;
