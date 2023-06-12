import React, { FC } from "react";
import { Link } from "react-router-dom";

const HomePage: FC = () => {
  const pages = [
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
    <div className="home__page">
      {pages.map((page) => (
        <div key={page.path} className="page">
          <Link to={page.path}>{page.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
