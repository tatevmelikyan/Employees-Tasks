import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteEmployee } from "./slice";

const DeleteEmployee = ({
  setOpen,
  employeeId,
}: {
  setOpen: (isOpen: boolean) => void;
  employeeId: string;
}) => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.employees.error);
  const loading = useAppSelector((state) => state.employees.loading);
  console.log(error, "error delete");

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteEmployee(employeeId)).then(() => {
      handleCancel();
    });
  };

  return (
    <div>
      {loading && <div className="loading">Loading...</div>}
      <div className="popup__background" onClick={handleCancel}></div>
      <div className="popup__window">
        <div className="cancel__button" onClick={handleCancel}>
          X
        </div>
        <div className="title">
          <span>Delete employee</span>
        </div>
        <div className="content">
          Deleting this employee will also delete it from the data base.
        </div>
        <div className="buttons">
          <button className="cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button className="delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEmployee;
