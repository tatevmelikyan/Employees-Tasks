import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteTask, paginateTasks } from "./slice";

interface IDeleteTaskProps {
  handleOpenDeleteTask: () => void;
  taskId: string;
}

const DeleteTask: FC<IDeleteTaskProps> = ({ handleOpenDeleteTask, taskId }) => {
  const loading = useAppSelector((state) => state.tasks.loading);
  const currentPage = useAppSelector((state) => state.tasks.currentPage);
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(deleteTask(taskId)).then(() => {
      dispatch(paginateTasks(currentPage));
      handleOpenDeleteTask();
    });
  };

  return (
    <div>
      {loading && <div className="loading">Loading...</div>}
      <div className="popup__background" onClick={handleOpenDeleteTask}></div>
      <div className="popup__window">
        <button className="x__button" onClick={handleOpenDeleteTask}>
          X
        </button>
        <h4>Delete Task</h4>
        <p>Are you sure you want to delete this task?</p>
        <div className="buttons">
          <button className="cancel" onClick={handleOpenDeleteTask}>
            Cancel
          </button>
          <button className="delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTask;
