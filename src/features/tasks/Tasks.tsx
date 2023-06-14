import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Task from "./Task";
import {} from "../employees/slice";
import { fetchAllTasks, paginate } from "./slice";
import CreateTaskForm from "./CreateTaskForm";
import UpdateTaskForm from "./UpdateTaskForm";
import DeleteTask from "./DeleteTask";
import SearchTask from "./SearchTask";
import ErrorMessage from "../error/ErrorMessage";
import Pagination from "../pagination/Pagination";

const Tasks: FC = () => {
  const dispatch = useAppDispatch();
  const allTasks = useAppSelector((state) => state.tasks.items);
  const paginatedTasks = useAppSelector(state => state.tasks.paginatedItems)
  const loading = useAppSelector((state) => state.tasks.loading);
  const error = useAppSelector((state) => state.tasks.error);
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [updatedTaskOpen, setUpdateTaskOpen] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState("");
  const [taskToDelete, setTaskToDelete] = useState("");
  const [deleteTaskOpen, setDeleteTaskOpen] = useState(false);
  const limit = 3
  const totalPages = Math.ceil(allTasks.length / limit);

  useEffect(() => {
    dispatch(fetchAllTasks()).then(() => {
      dispatch(paginate({page: 1, limit}))
    })
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
    dispatch(paginate({page, limit}))
  }

  console.log(allTasks, "tasks");

  return (
    <div className="tasks__page">
      {loading && <div className="loading">Loading...</div>}
      <h2>Tasks</h2>
      <SearchTask />
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
        {error ? (
          <ErrorMessage message={error} />
        ) : (
          paginatedTasks.map((task) => (
            <div key={task.id}>
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
          ))
        )}
      </div>
      <Pagination totalPages={totalPages} onPageChange={onPageChange}/>
    </div>
  );
};

export default Tasks;
