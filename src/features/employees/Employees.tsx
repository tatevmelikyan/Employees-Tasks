import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAllEmployees, paginateEmployees } from "./slice";
import AddEmployeeForm from "./AddEmployeeForm";
import { useNavigate } from "react-router-dom";
import UpdateEmployeeForm from "./UpdateEmployeeForm";
import DeleteEmployee from "./DeleteEmployee";
import Pagination from "../pagination/Pagination";

const Employees: FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.employees.loading);
  const error = useAppSelector((state) => state.employees.error);

  const allEmployees = useAppSelector((state) => state.employees.items);
  const paginatedEmployees = useAppSelector(
    (state) => state.employees.paginatedItems
  );
  const totalPages = useAppSelector((state) => state.employees.totalPages);

  const [addFormOpen, setAddFormOpen] = useState(false);
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [employeeToUpdate, setEmployeeToUpdate] = useState("");
  const [employeeToDelete, setEmployeeToDelete] = useState("");
  const [deleteEmployeePopup, setDeleteEmployeePopup] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchAllEmployees()).then(() => {
      dispatch(paginateEmployees(1));
    });
  }, [dispatch]);

  const onPageChange = (page: number) => {
    dispatch(paginateEmployees(page));
  };

  return (
    <div className="employees__page">
      {error}
      <div className="title">
        <h2>Employees</h2>
        <button className="add__item" onClick={() => setAddFormOpen(true)}>
          Create Employee
        </button>
      </div>
      {loading && <div className="loading">Loading...</div>}
      {addFormOpen && <AddEmployeeForm setOpen={setAddFormOpen} />}
      {updateFormOpen && (
        <UpdateEmployeeForm
          setOpen={setUpdateFormOpen}
          employeeId={employeeToUpdate}
        />
      )}
      {deleteEmployeePopup && (
        <DeleteEmployee
          setOpen={setDeleteEmployeePopup}
          employeeId={employeeToDelete}
        />
      )}
      <div className="page__content">
        {paginatedEmployees.map((employee) => {
          return (
            <div
              key={employee.id}
              className="info__container employee"
              onClick={() => navigate(`/employees/${employee.id}`)}
            >
              <div className="item__info">
                <p>ID: {employee.id}</p>
                <p>Name: {employee.name}</p>
                <p>Surname: {employee.surname}</p>
                <p>Email: {employee.email}</p>
                <p>Position: {employee.position}</p>
              </div>
              <div className="buttons">
                <div className="update__employee">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUpdateFormOpen(true);
                      setEmployeeToUpdate(employee.id);
                    }}
                  >
                    Edit
                  </button>
                </div>
                <div className="delete__employee">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteEmployeePopup(true);
                      setEmployeeToDelete(employee.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {allEmployees.length ? (
        <Pagination totalPages={totalPages} onPageChange={onPageChange} />
      ) : (
        <div>No results</div>
      )}
    </div>
  );
};

export default Employees;
