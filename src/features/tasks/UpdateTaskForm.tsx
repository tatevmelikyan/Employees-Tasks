import { FC, useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { paginateTasks, updateTask } from "./slice";
import { ITask } from "../../types";
import { fetchAllEmployees } from "../employees/slice";

interface IUpdateTaskProps {
  handleOpenUpdateTask: () => void;
  taskId: string;
}

const UpdateTaskForm: FC<IUpdateTaskProps> = ({handleOpenUpdateTask,taskId}) => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(state => state.tasks.currentPage)
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
      dispatch(paginateTasks(currentPage))
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
      <div className="popup__background" onClick={handleOpenUpdateTask}></div>
      <div className="popup__window">
      <button className="x__button" onClick={handleOpenUpdateTask}>X</button>
        <h4>Update Task</h4>
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
         </div>
          <div className="buttons">
            <button className="save__button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTaskForm;
