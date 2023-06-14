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
      <button className="x__button" onClick={handleOpenDeleteTask}>X</button>
        <h4>Delete Task</h4>
        <p>Are you sure you want to delete this task?</p>
        <div className="buttons">
          <button className="cancel" onClick={handleOpenDeleteTask}>Cancel</button>
          <button className="delete" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTask;
