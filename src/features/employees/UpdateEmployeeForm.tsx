import { FC, useState, ChangeEvent, FormEvent } from "react";
import { IEmployee } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { paginateEmployees, updateEmployee } from "./slice";

interface IUpdateEmployeeProps {
  setOpen: (isOpen: boolean) => void;
  employeeId: string;
}

const UpdateEmployeeForm: FC<IUpdateEmployeeProps> = ({
  setOpen,
  employeeId,
}) => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.employees.currentPage);

  const employee = useAppSelector((state) =>
    state.employees.paginatedItems.find(
      (employee) => employee.id === employeeId
    )
  );

  const [updatedEmployee, setUpdatedEmployee] = useState<IEmployee>(
    employee as IEmployee
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateEmployee(updatedEmployee)).then(() => {
      dispatch(paginateEmployees(currentPage));
      handleCancel();
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
      id: "surname",
      label: "Surname:",
    },
    {
      type: "email",
      id: "email",
      label: "Email:",
    },
    {
      type: "text",
      id: "position",
      label: "Position:",
    },
  ];

  return (
    <div>
      <div className="popup__background" onClick={handleCancel}></div>
      <div className="popup__window">
        <button className="x__button" onClick={handleCancel}>
          X
        </button>
        <h4>Update employee</h4>
        <form onSubmit={handleSubmit}>
          <div className="form__inputs">
            {formInputs.map((inputInfo) => {
              return (
                <div key={inputInfo.id}>
                  <label htmlFor={inputInfo.id}>{inputInfo.label}</label>
                  <input
                    type={inputInfo.type}
                    id={inputInfo.id}
                    name={inputInfo.id}
                    value={updatedEmployee[inputInfo.id as keyof IEmployee]}
                    required
                    onChange={handleInputChange}
                  />
                </div>
              );
            })}
          </div>
          <button className="save__button">Save</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployeeForm;
