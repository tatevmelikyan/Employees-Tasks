import { FC, useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createTask, paginateTasks } from "./slice";
import { INewTask } from "../../types";
import { fetchAllEmployees } from "../employees/slice";

interface ICreateTaskProps {
  handleOpenCreateTask: () => void;
}

const CreateTaskForm: FC<ICreateTaskProps> = ({ handleOpenCreateTask }) => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.tasks.currentPage);
  const employees = useAppSelector((state) => state.employees.items);

  const [newTask, setNewTask] = useState<INewTask>({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    employeeId: "",
  });

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
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createTask(newTask)).then(() => {
      dispatch(paginateTasks(currentPage));
      handleOpenCreateTask();
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
      <div className="popup__background" onClick={handleOpenCreateTask}></div>
      <div className="popup__window">
        <button className="x__button" onClick={handleOpenCreateTask}>
          X
        </button>
        <h4>Create task</h4>
        <form onSubmit={handleSubmit}>
          <div className="form__inputs">
            {formInputs.map((inputInfo) => {
              return (
                <div key={inputInfo.id}>
                  <label htmlFor={inputInfo.id}>{inputInfo.label}</label>
                  {inputInfo.id === "employeeId" ? (
                    <select
                      name={inputInfo.id}
                      id={inputInfo.id}
                      required
                      onChange={handleInputChange}
                    >
                      <option value="">Select Employee</option>
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
                      value={newTask.description}
                      onChange={handleInputChange}
                    ></textarea>
                  ) : (
                    <input
                      type={inputInfo.type}
                      id={inputInfo.id}
                      name={inputInfo.id}
                      value={newTask[inputInfo.id as keyof typeof newTask]}
                      required
                      onChange={handleInputChange}
                      {...(inputInfo.id === "startDate"
                        ? { max: newTask.endDate }
                        : inputInfo.id === "endDate"
                        ? { min: newTask.startDate }
                        : {})}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="buttons">
            <button className="save__button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskForm;
