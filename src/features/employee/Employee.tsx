import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchEmployee, fetchEmployeeTasks } from "./slice";

const Employee: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const employee = useAppSelector((state) => state.employee.info);
  const tasks = useAppSelector((state) => state.employee.tasks);
  const status = useAppSelector((state) => state.employee.loading);

  useEffect(() => {
    if (id) {
      dispatch(fetchEmployee({ id }));
      dispatch(fetchEmployeeTasks({ id }));
    }
  }, [id, dispatch]);
  return (
    <div>
      {!employee || status === "loading" ? (
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
          <div className="employee_tasks">
            {tasks.map((task) => (
              <div className="employee__task">
                <p>ID: {task.id}</p>
                <p>Name: {task.name}</p>
                <p>Description: {task.description}</p>
                <p>Start Date: {task.startDate}</p>
                <p>End Date: {task.endDate}</p>
                <p>Employee ID: {task.employeeId}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;
