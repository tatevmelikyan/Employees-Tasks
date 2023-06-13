import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Task from "./Task";
import {} from "../employees/slice";
import { fetchAllTasks } from "./slice";
import CreateTaskForm from "./CreateTaskForm";
import UpdateTaskForm from "./UpdateTaskForm";
import DeleteTask from "./DeleteTask";

const Tasks: FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.items);
  const loading = useAppSelector((state) => state.tasks.loading);
  const error = useAppSelector((state) => state.tasks.error);
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [updatedTaskOpen, setUpdateTaskOpen] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState("");
  const [taskToDelete, setTaskToDelete] = useState("");
  const [deleteTaskOpen, setDeleteTaskOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);

  const handleOpenCreateTask = () => {
    setCreateTaskOpen(!createTaskOpen);
  };

  const handleOpenUpdateTask = () => {
    setUpdateTaskOpen(!updatedTaskOpen);
  };

  const handleOpenDeleteTask = () => {
    setDeleteTaskOpen(!deleteTaskOpen);
  };
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
      {updatedTaskOpen && (
        <UpdateTaskForm
          handleOpenUpdateTask={handleOpenUpdateTask}
          taskId={taskToUpdate}
        />
      )}
      {deleteTaskOpen && (
        <DeleteTask
          handleOpenDeleteTask={handleOpenDeleteTask}
          taskId={taskToDelete}
        />
      )}
      <div className="tasks__container">
        {tasks.map((task) => (
          <div>
            <Task key={task.id} task={task} />
            <button
              onClick={() => {
                handleOpenUpdateTask();
                setTaskToUpdate(task.id);
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                setTaskToDelete(task.id);
                handleOpenDeleteTask();
              }}
            >
              Delete Task
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
