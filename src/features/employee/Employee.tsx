import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IEmployee } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchEmployee } from "./slice";

const Employee: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const employee = useAppSelector((state) => state.employee.info);
  const status = useAppSelector((state) => state.employee.loading);

  useEffect(() => {
    if (id) {
      dispatch(fetchEmployee({ id }));
    }
  }, [id, dispatch]);
  return (
    <div>
      {!employee || status === 'loading' ? (
        <p>Loading...</p>
      ) : (
        <div className="employee__page">
          <div className="employee__info">
            <p>ID: {employee.id}</p>
            <p>Name: {employee.name}</p>
            <p>Surname: {employee.surname}</p>
            <p>Email: {employee.email}</p>
            <p>Position: {employee.position}</p>
          </div>
          <div>{employee.name}'s Tasks</div>
          <div className="employee_tasks">task 1 task 2</div>
        </div>
      )}
    </div>
  );
};

export default Employee;
