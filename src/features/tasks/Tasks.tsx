import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Task from "./Task";
import {  } from "../employees/slice";
import { fetchAllTasks } from "./slice";

const Tasks: FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.items);
  const loading = useAppSelector((state) => state.tasks.loading);
  const error = useAppSelector((state) => state.tasks.error);

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);

  return (
    <div className="tasks__page">
      <h2>Tasks</h2>
      <div className="tasks__container">
        {tasks.map((task) => (
          <Task task={task} />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
