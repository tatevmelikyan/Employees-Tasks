import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import './style.css'

const Navigation: FC = () => {
  const pages = [
    {
      name: "Home",
      path: '/'
    },
    {
      name: "Employees",
      path: "/employees",
    },
    {
      name: "Tasks",
      path: "/tasks",
    },
  ];
  
  return (
    <nav className="nav">
      <ul>
      {pages.map((page) => (
        <li key={page.path}>
          <NavLink to={page.path}>{page.name}</NavLink>
        </li>
      ))}
      </ul>
    </nav>
  );
};

export default Navigation;
