import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Task from "./Task";
import {} from "../employees/slice";
import { fetchAllTasks, paginateTasks } from "./slice";
import CreateTaskForm from "./CreateTaskForm";
import UpdateTaskForm from "./UpdateTaskForm";
import DeleteTask from "./DeleteTask";
import SearchTask from "./SearchTask";
import Pagination from "../pagination/Pagination";

const Tasks: FC = () => {
  const dispatch = useAppDispatch();
  const allTasks = useAppSelector((state) => state.tasks.items);
  const paginatedTasks = useAppSelector((state) => state.tasks.paginatedItems);
  const loading = useAppSelector((state) => state.tasks.loading);
  const error = useAppSelector((state) => state.tasks.error);
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [updatedTaskOpen, setUpdateTaskOpen] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState("");
  const [taskToDelete, setTaskToDelete] = useState("");
  const [deleteTaskOpen, setDeleteTaskOpen] = useState(false);
  const totalPages = useAppSelector((state) => state.tasks.totalPages);

  useEffect(() => {
    dispatch(fetchAllTasks()).then(() => {
      dispatch(paginateTasks(1));
    });
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

  const onPageChange = (page: number) => {
    dispatch(paginateTasks(page));
  };

  return (
    <div className="tasks__page">
      {loading && <div className="loading">Loading...</div>}
      <div className="title">
        <h2>Tasks</h2>
        <button onClick={handleOpenCreateTask}>Create Task</button>
      </div>
      <SearchTask />
      {createTaskOpen && (
        <CreateTaskForm handleOpenCreateTask={handleOpenCreateTask} />
      )}
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
      <div className="page__content">
        {error ? (
          <div>{error}</div>
        ) : (
          paginatedTasks.map((task) => (
            <div className="info__container" key={task.id}>
              <Task key={task.id} task={task} />
              <div className="buttons">
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
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {allTasks.length ? (
        <Pagination totalPages={totalPages} onPageChange={onPageChange} />
      ) : (
        <div>No results</div>
      )}
    </div>
  );
};

export default Tasks;
