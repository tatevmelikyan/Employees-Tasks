import { FC, useState, useEffect, useRef } from "react";
import "./style.css";

interface PaginationProps {
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const initialRender = useRef(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      onPageChange(currentPage);
    }
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePreviousPages = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPages = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let page = 1; page <= totalPages; page++) {
      pages.push(
        <li key={page}>
          <button
            className={currentPage === page ? "active" : ""}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        </li>
      );
    }
    return pages;
  };

  return (
    <div className="pagination">
      <ul>
        <li>
          <button onClick={handlePreviousPages} disabled={currentPage === 1}>
            Prev
          </button>
        </li>
        {renderPageNumbers()}
        <li>
          <button
            onClick={handleNextPages}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
