import React, { FC, useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAllEmployees, fetchEmployeesPerPage } from "./slice";
import Pagination from "../pagination/Pagination";
import AddEmployeeForm from "./AddEmployeeForm";
import { Link, useNavigate } from "react-router-dom";
import UpdateEmployeeForm from "./UpdateEmployeeForm";
import DeleteEmployee from "./DeleteEmployee";

const Employees: FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.employees.loading);
  const pageEmployees = useAppSelector(
    (state) => state.employees.pageEmployees
  );
  const allEmployees = useAppSelector((state) => state.employees.allEmployees);
  const [dataPerPage, setDataPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [addFormOpen, setAddFormOpen] = useState(false);
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [employeeToUpdate, setEmployeeToUpdate] = useState("");
  const [employeeToDelete, setEmployeeToDelete] = useState("");
  const [deleteEmployeePopup, setDeleteEmployeePopup] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchEmployeesPerPage({ currentPage: currentPage, dataPerPage }));
  }, [dispatch, currentPage, dataPerPage, allEmployees]);

  return (
    <div>
      <h2>Employees</h2>
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
      {pageEmployees.map((employee) => {
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
      <Pagination
        totalData={allEmployees}
        dataPerPage={dataPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Employees;
