import { useEffect, useMemo, useState } from "react";

const getNextPage = ({ page, pageSize, data }) => {
  return data.slice(page * pageSize, (page * pageSize) + pageSize);
};

const usePagination = ({
  data = [],
  pageSize = 20
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [page, setPage] = useState([]);

  useEffect(() => {
    setPage(getNextPage({ page: 0, pageSize, data }));
    setCurrentPage(0);
  }, [data, pageSize]);

  const pages = useMemo(() => {
    return Math.ceil(data.length / pageSize);
  }, [data, pageSize]);

  const canNextPage = useMemo(() => {
    return ((currentPage + 1) * pageSize) < data.length;
  }, [currentPage, pageSize, data]);

  const canPreviousPage = useMemo(() => {
    return currentPage > 0;
  }, [currentPage, pageSize, data]);

  const nextPage = () => {
    if (canNextPage) {
      const newPage = currentPage + 1;
      setPage(getNextPage({ page: newPage, pageSize, data }));
      setCurrentPage(newPage);
    }
  };

  const lastPage = () => {
    const newPage = pages - 1;
    setPage(data.slice((newPage) * pageSize, ((newPage) * pageSize) + pageSize));
    setCurrentPage(newPage);
  };

  const firstPage = () => {
    setPage(data.slice(0, pageSize));
    setCurrentPage(0);
  };

  const previousPage = () => {
    if (canPreviousPage) {
      setPage(data.slice((currentPage * pageSize) - pageSize, currentPage * pageSize));
      setCurrentPage(currentPage - 1);
    }
  };

  return {
    pages,
    currentPage,
    page,
    nextPage,
    lastPage,
    firstPage,
    previousPage,
    canNextPage,
    canPreviousPage
  };
};

export default usePagination;
