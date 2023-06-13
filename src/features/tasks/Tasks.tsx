import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Task from "./Task";
import {} from "../employees/slice";
import { fetchAllTasks } from "./slice";
import CreateTaskForm from "./CreateTaskForm";

const Tasks: FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.items);
  const loading = useAppSelector((state) => state.tasks.loading);
  const error = useAppSelector((state) => state.tasks.error);
  const [createTaskOpen, setCreateTaskOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);

  const handleOpenCreateTask = () => {
    setCreateTaskOpen(!createTaskOpen);
  };

  console.log(createTaskOpen, "form open");

  return (
    <div className="tasks__page">
      {loading && <div className="loading">Loading...</div>}
      <h2>Tasks</h2>
      <div>
        <button onClick={handleOpenCreateTask}>Create new task</button>
        {createTaskOpen && (
          <CreateTaskForm handleOpenCreateTask={handleOpenCreateTask} />
        )}
      </div>
      <div className="tasks__container">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
