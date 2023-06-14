import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateTask } from "./slice";
import { ITask } from "../../types";
import { fetchAllEmployees } from "../employees/slice";

const UpdateTaskForm = ({
  handleOpenUpdateTask,
  taskId,
}: {
  handleOpenUpdateTask: () => void;
  taskId: string;
}) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.tasks.loading);
  const error = useAppSelector((state) => state.tasks.error);
  const employees = useAppSelector((state) => state.employees.items);
  const taskToUpdate = useAppSelector((state) =>
    state.tasks.items.find((task) => task.id === taskId)
  );
  const [updatedTask, setUpdatedTask] = useState<ITask>(taskToUpdate as ITask);

  useEffect(() => {
    if (!employees.length) {
      dispatch(fetchAllEmployees());
    }
  }, [dispatch, employees.length]);

  const handleInputChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateTask({ task: updatedTask })).then(() => {
      handleOpenUpdateTask();
    });
  };

  const formInputs = [
    {
      type: "text",
      id: "name",
      label: "Name:",
    },
    {
      type: "text",
      id: "description",
      label: "Description:",
    },
    {
      type: "date",
      id: "startDate",
      label: "Start Date:",
    },
    {
      type: "date",
      id: "endDate",
      label: "End Date:",
    },
    {
      type: "text",
      id: "employeeId",
      label: "Employee ID:",
    },
  ];

  return (
    <div>
      {loading && <div className="loading">Loading...</div>}
      <div className="popup__background" onClick={handleOpenUpdateTask}></div>
      <div className="popup__window">
        <h4>Edit Task</h4>
        <button onClick={handleOpenUpdateTask}>X</button>
        <form onSubmit={handleSubmit}>
          {formInputs.map((inputInfo) => {
            return (
              <div key={inputInfo.id} className="input__container">
                <label htmlFor={inputInfo.id}>{inputInfo.label}</label>
                {inputInfo.id === "employeeId" ? (
                  <select
                    name={inputInfo.id}
                    id={inputInfo.id}
                    required
                    onChange={handleInputChange}
                    value={taskToUpdate?.employeeId}
                  >
                    {employees.map((employee) => {
                      const fullName = `${employee.name} ${employee.surname}`;
                      return (
                        <option key={employee.id} value={employee.id}>
                          {fullName}
                        </option>
                      );
                    })}
                  </select>
                ) : inputInfo.id === "description" ? (
                  <textarea
                    name={inputInfo.id}
                    id={inputInfo.id}
                    value={updatedTask.description}
                    onChange={handleInputChange}
                  ></textarea>
                ) : (
                  <input
                    type={inputInfo.type}
                    id={inputInfo.id}
                    name={inputInfo.id}
                    value={updatedTask[inputInfo.id as keyof ITask]}
                    required
                    onChange={handleInputChange}
                    {...(inputInfo.id === "startDate"
                      ? { max: updatedTask.endDate }
                      : inputInfo.id === "endDate"
                      ? { min: updatedTask.startDate }
                      : {})}
                  />
                )}
              </div>
            );
          })}
          <div className="buttons">
            <button>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTaskForm;
