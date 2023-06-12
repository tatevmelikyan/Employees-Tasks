import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navigation from "./features/navigation/Navigation";
import Employees from "./features/employees/Employees";
import Tasks from "./features/tasks/Tasks";
import Employee from "./features/employee/Employee";
import HomePage from "./features/home/HomePage";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/employees/:id" element={<Employee />} />
      </Routes>
    </div>
  );
}

export default App;
