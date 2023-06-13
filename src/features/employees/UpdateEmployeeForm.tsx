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
    state.employees.pageEmployees.find((employee) => employee.id === employeeId)
  );
  console.log(employee, "employee to update");

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

  return (
    <div>
      {loading && <div className="loading">Loading...</div>}
      <div className="popup__background" onClick={handleCancel}></div>
      <div className="popup__window">
        <button onClick={handleCancel}>X</button>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={updatedEmployee.name}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="surname">Surname:</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={updatedEmployee.surname}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={updatedEmployee.email}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="position">Position</label>
            <input
              type="text"
              id="position"
              name="position"
              value={updatedEmployee.position}
              required
              onChange={handleInputChange}
            />
          </div>
          <button>Save</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployeeForm;
