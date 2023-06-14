import React, { useState, ChangeEvent, FormEvent } from "react";
import { IEmployee } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateEmployee } from "./slice";

const UpdateEmployeeForm = ({
  setOpen,
  employeeId,
}: {
  setOpen: (isOpen: boolean) => void;
  employeeId: string;
}) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.employees.loading);
  const employee = useAppSelector((state) =>
    state.employees.paginatedItems.find((employee) => employee.id === employeeId)
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
      {loading && <div className="loading">Loading...</div>}
      <div className="popup__background" onClick={handleCancel}></div>
      <div className="popup__window">
        <button onClick={handleCancel}>X</button>
        <form onSubmit={handleSubmit}>
          {formInputs.map((inputInfo) => {
            return (
              <div>
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
          <button>Save</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployeeForm;
