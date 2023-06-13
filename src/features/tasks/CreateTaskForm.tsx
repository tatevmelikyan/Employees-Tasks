import React, { useState, ChangeEvent, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createTask } from "./slice";
import { INewTask } from "../../types";

const CreateTaskForm = ({
    handleOpenCreateTask,
}: {
    handleOpenCreateTask: () => void;
}) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.tasks.loading);

  const [newTask, setNewTask] = useState<INewTask>({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    employeeId: "",
  });



  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createTask(newTask)).then(() => {
        handleOpenCreateTask()
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
      type: "text",
      id: "startDate",
      label: "Start date:",
    },
    {
      type: "text",
      id: "endDate",
      label: "End date:",
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
      <div className="popup__background" onClick={handleOpenCreateTask}></div>
      <div className="popup__window">
        <h4>Create task</h4>
        <button onClick={handleOpenCreateTask}>X</button>
        <form onSubmit={handleSubmit}>
          {formInputs.map((inputInfo) => {
            return (
              <div key={inputInfo.id} className="input__info">
                <label htmlFor={inputInfo.id}>{inputInfo.label}</label>
                <input
                  type={inputInfo.type}
                  id={inputInfo.id}
                  name={inputInfo.id}
                  value={newTask[inputInfo.id as keyof typeof newTask]}
                  required
                  onChange={handleInputChange}
                />
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

export default CreateTaskForm;
