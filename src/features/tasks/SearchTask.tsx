import React, { useState, ChangeEvent, FormEvent } from "react";
import { ISearchTaskParams } from "../../types";
import { useAppDispatch } from "../../app/hooks";
import { paginateTasks, searchTask } from "./slice";

const SearchTask = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useState<ISearchTaskParams>({
    name_like: "",
    description_like: "",
    startDate: "",
    endDate: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(searchTask(searchParams)).then(() => {
      dispatch(paginateTasks({page: 1, limit: 3}))
    });
  };

  const searchFields = [
    {
      type: "text",
      placeholder: "Search by name",
      name: "name_like",
    },
    {
      type: "text",
      placeholder: "Search by description",
      name: "description_like",
    },
    {
      type: "date",
      placeholder: "Search by start date",
      name: "startDate",
    },
    {
      type: "date",
      placeholder: "Search by end date",
      name: "endDate",
    },
  ];

  return (
    <div className="title">
      <h2>Search Task</h2>
      <form className="search" onSubmit={handleSubmit}>
        {searchFields.map((field) => (
          <label key={field.name} htmlFor={field.name}>
            {field.placeholder}
            <input
            type={field.type}
            name={field.name}
            id={field.name}
            value={searchParams[field.name as keyof ISearchTaskParams]}
            onChange={handleInputChange}
          />
          </label>
        ))}
        <button>Search</button>
      </form>
    </div>
  );
};

export default SearchTask;
