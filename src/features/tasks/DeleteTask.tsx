import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteTask } from "./slice";

const DeleteTask = ({
  handleOpenDeleteTask,
  taskId,
}: {
  handleOpenDeleteTask: () => void;
  taskId: string;
}) => {
  const loading = useAppSelector((state) => state.tasks.loading);
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(deleteTask(taskId)).then(() => {
      handleOpenDeleteTask();
    });
  };

  return (
    <div>
      {loading && <div className="loading">Loading...</div>}
      <div className="popup__background" onClick={handleOpenDeleteTask}></div>
      <div className="popup__window">
        <h4>Delete Task</h4>
        <button onClick={handleOpenDeleteTask}>X</button>
        <p>Are you sure you want to delete this task?</p>
        <button onClick={handleOpenDeleteTask}>Cancel</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default DeleteTask;
