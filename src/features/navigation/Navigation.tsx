import React, { FC } from "react";
import { Link } from "react-router-dom";

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
        <li key={page.path} className="page">
          <Link to={page.path}>{page.name}</Link>
        </li>
      ))}
      </ul>
    </nav>
  );
};

export default Navigation;
