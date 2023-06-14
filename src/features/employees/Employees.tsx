import React, { FC, useEffect, useState, useRef } from "react";
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

  const allEmployees = useAppSelector((state) => state.employees.items);
  const paginatedEmployees = useAppSelector(
    (state) => state.employees.paginatedItems
  );

  const [addFormOpen, setAddFormOpen] = useState(false);
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [employeeToUpdate, setEmployeeToUpdate] = useState("");
  const [employeeToDelete, setEmployeeToDelete] = useState("");
  const [deleteEmployeePopup, setDeleteEmployeePopup] = useState(false);
  const limit = 3;
  const totalPages = Math.ceil(allEmployees.length / limit);

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchAllEmployees()).then(() => {
      dispatch(paginateEmployees({ page: 1, limit }));
    });
  }, [dispatch]);

  const onPageChange = (page: number) => {
    dispatch(paginateEmployees({ page, limit }));
  };

  return (
    <div>
      <h2>Employees</h2>
      {loading && <div className="loading">Loading...</div>}
      {addFormOpen ? (
        <AddEmployeeForm setOpen={setAddFormOpen} />
      ) : (
        <button onClick={() => setAddFormOpen(true)}>Add a new employee</button>
      )}
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
      {paginatedEmployees.map((employee) => {
        return (
          <div
            key={employee.id}
            className="employee__container"
            onClick={() => navigate(`/employees/${employee.id}`)}
          >
            <div className="employee__info">
              <p>ID: {employee.id}</p>
              <p>Name: {employee.name}</p>
              <p>Surname: {employee.surname}</p>
              <p>Email: {employee.email}</p>
              <p>Position: {employee.position}</p>
            </div>
            <div className="update__employee">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setUpdateFormOpen(true);
                  setEmployeeToUpdate(employee.id);
                }}
              >
                Update Employee
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
                Delete Employee
              </button>
            </div>
          </div>
        );
      })}
      <Pagination totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
};

export default Employees;
