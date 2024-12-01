import { useState } from "react";

export const usePagination = <T>(data:T[], limit:number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const startId = (currentPage - 1) * limit;
  const endId = currentPage * limit;
  const paginatedData = data.slice(startId, endId);

  const nextPage = () => {
    setCurrentPage((prevPage) => 
      prevPage + 1
    );
  };

  const previousPage = () => {
    setCurrentPage((prevPage) =>
      Math.max(prevPage - 1, 1)
    );
  };

  return{
    paginatedData,
    currentPage,
    nextPage,
    previousPage
  };
};