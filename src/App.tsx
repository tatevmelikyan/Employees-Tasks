import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./features/home/HomePage";
import Employees from "./features/employees/Employees";
import Tasks from "./features/tasks/Tasks";
import Employee from "./features/employee/Employee";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/employees/:id" element={<Employee />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
