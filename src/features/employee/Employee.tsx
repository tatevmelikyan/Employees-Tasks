import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchEmployee, fetchEmployeeTasks } from "./slice";
import Task from "../tasks/Task";
import "./style.css";

const Employee: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const employee = useAppSelector((state) => state.employee.info);
  const tasks = useAppSelector((state) => state.employee.tasks);
  const loading = useAppSelector((state) => state.employee.loading);
  const error = useAppSelector((state) => state.employee.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchEmployee({ id }));
      dispatch(fetchEmployeeTasks({ id }));
    }
  }, [id, dispatch]);
  return (
    <div>
      {loading && <div className="loading">Loading...</div>}
      {error}
      {employee && (
        <div className="employee__page">
          <div className="title">
            <h2>{`${employee.name} ${employee.surname}`}</h2>
          </div>
          <div className="employee__info">
            <p>ID: {employee.id}</p>
            <p>Name: {employee.name}</p>
            <p>Surname: {employee.surname}</p>
            <p>Email: {employee.email}</p>
            <p>Position: {employee.position}</p>
          </div>
          <div className="employee__tasks__field">
            <h4>{employee.name}'s Tasks</h4>
            <div className="info__container">
              {tasks.map((task) => (
                <Task task={task} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;
