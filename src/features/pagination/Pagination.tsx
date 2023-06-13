import React, { FC, useState, useEffect } from "react";
import { IEmployee } from "../../types";

interface IPaginationProps {
  totalData: IEmployee[];
  dataPerPage: number;
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
}

const Pagination: FC<IPaginationProps> = ({
  totalData,
  dataPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const [pagesCount, setPagesCount] = useState(0);

  useEffect(() => {
    setPagesCount(Math.ceil(totalData.length / dataPerPage));
  }, [totalData, dataPerPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage !== pagesCount) {
      setCurrentPage(currentPage + 1);
    }
  };
  const pageNumbers = [];

  for (let i = 1; i <= pagesCount; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination__container">
      <ul className="pagination">
        <li className="page_number" onClick={handlePreviousPage}>
          Prev
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className="page__number"
            onClick={() => handlePageChange(number)}
          >
            {number}
          </li>
        ))}
        <li className="page_number" onClick={handleNextPage}>
          Next
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
