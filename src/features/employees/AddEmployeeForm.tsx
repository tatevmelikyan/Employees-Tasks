import React, { useState, ChangeEvent, FormEvent } from "react";
import { INewEmployee } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addEmployee, fetchAllEmployees } from "./slice";

const AddEmployeeForm = ({
  setOpen,
}: {
  setOpen: (isOpen: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.employees.loading);
  const [newEmployee, setNewEmployee] = useState<INewEmployee>({
    name: "",
    surname: "",
    email: "",
    position: "",
  });

  const handleCancel = () => {
    setOpen(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addEmployee(newEmployee)).then(() => {
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
                  value={newEmployee[inputInfo.id as keyof INewEmployee]}
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

export default AddEmployeeForm;
