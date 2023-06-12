import React, { useState, ChangeEvent, FormEvent } from "react";
import { INewEmployee } from "../../types";
import { useAppDispatch } from "../../app/hooks";
import { fetchAllEmployees } from "./slice";

const AddEmployeeForm = ({
  setOpen,
}: {
  setOpen: (isOpen: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [newEmployee, setNewEmployee] = useState<INewEmployee>({
    name: "",
    surname: "",
    email: "",
    position: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, "name of el");

    setNewEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    fetch("https://rocky-temple-83495.herokuapp.com/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    })
      .then((res) => {
        setLoading(false);
        setNewEmployee({
          name: "",
          surname: "",
          email: "",
          position: "",
        });
        setOpen(false);
        dispatch(fetchAllEmployees());
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <button onClick={() => setOpen(false)}>X</button>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newEmployee.name}
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
            value={newEmployee.surname}
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
            value={newEmployee.email}
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
            value={newEmployee.position}
            required
            onChange={handleInputChange}
          />
        </div>
        {loading ? (
          <button disabled>Loading...</button>
        ) : (
          <button>Add Employee</button>
        )}
      </form>
    </div>
  );
};

export default AddEmployeeForm;
