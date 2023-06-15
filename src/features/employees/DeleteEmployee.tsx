import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteEmployee, paginateEmployees } from "./slice";

interface IDeleteEmployeeProps {
  setOpen: (isOpen: boolean) => void;
  employeeId: string;
}

const DeleteEmployee: FC<IDeleteEmployeeProps> = ({ setOpen, employeeId }) => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.employees.error);
  const loading = useAppSelector((state) => state.employees.loading);
  const currentPage = useAppSelector((state) => state.employees.currentPage);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteEmployee(employeeId)).then(() => {
      dispatch(paginateEmployees(currentPage));
      handleCancel();
    });
  };

  return (
    <div>
      {error}
      {loading && <div className="loading">Loading...</div>}
      <div className="popup__background" onClick={handleCancel}></div>
      <div className="popup__window">
        <button className="x__button" onClick={handleCancel}>
          X
        </button>
        <h4>Delete employee</h4>
        <div className="content">
          Are you sure you want to delete this employee?
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
