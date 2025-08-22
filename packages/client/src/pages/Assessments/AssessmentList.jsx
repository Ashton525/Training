import React, { useEffect, useState } from 'react';
import { usePagination, useTable } from 'react-table';
import { AssessmentService } from '../../services/AssessmentService';

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);

  // Fetch assessments
  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const data = await AssessmentService.getList();
        setAssessments(data);
        console.log(`Fetched assessments:`, data);
      } catch (error) {
        console.error(`Error fetching assessments:`, error);
        setAssessments([]);
      }
    };

    fetchAssessments();
  }, []);

  const columns = React.useMemo(() => [ // only create columns once on mount
    {
      accessor: `id`,
      Header: `ID`,
    },
    {
      accessor: `catName`,
      Header: `Cat Name`,
    },
    {
      accessor: `catDateOfBirth`,
      Header: `Date of Birth`,
    },
    {
      accessor: `riskLevel`,
      Header: `Risk Level`,
    },
    {
      accessor: `score`,
      Header: `Score`,
    },
    {
      accessor: `createdAt`,
      Cell: ({ value }) => {
        const date = new Date(value);
        return date.toLocaleDateString();
      },
      Header: `Created At`,
    },
  ], []);

  // everything needed for pagination
  const {
    canNextPage,
    canPreviousPage,
    getTableBodyProps,
    getTableProps,
    gotoPage,
    headerGroups,
    nextPage,
    page,
    pageCount,
    pageOptions,
    prepareRow,
    previousPage,
    state: { pageIndex }, // holds everything in state
  } = useTable(
    {
      columns,
      data: assessments,
      initialState: { pageIndex: 0, pageSize: 10 }, // default state
    },
    usePagination,
  );

  return <div className="container mt-4">
    <h1 className="mb-3">Cat Files</h1>
    <table
      {...getTableProps()}
      className="table table-bordered"
      style={{ border: `2px solid black`, width: `100%` }}
    >
      <thead className="table-light">
        {headerGroups.map((headerGroup, headerGroupIndex) =>
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex}>
            {headerGroup.headers.map((column, columnIndex) =>
              <th
                {...column.getHeaderProps()}
                key={column.id || columnIndex}
                style={{
                  border: `1px solid black`,
                  padding: `8px`,
                }}
              >
                {column.render(`Header`)}
              </th>)}
          </tr>)}
      </thead>

      <tbody {...getTableBodyProps()}>
        {page.map((row, rowIndex) => {
          prepareRow(row);
          return <tr {...row.getRowProps()} key={row.id || rowIndex}>
            {row.cells.map((cell, cellIndex) =>
              <td
                {...cell.getCellProps()}
                key={cell.column.id || cellIndex}
                style={{
                  backgroundColor:
                        cell.column.id === `riskLevel` ?
                          cell.value === `high` ?
                            `#f8d7da` :
                            cell.value === `medium` ?
                              `#fff3cd` :
                              `#d4edda` :
                          `#ffffff`,
                  border: `1px solid gray`,
                  padding: `8px`,
                }}
              >
                {cell.render(`Cell`)}
              </td>)}
          </tr>;
        })}
      </tbody>
    </table>

    <div className="d-flex justify-content-between align-items-center mt-3">
      <div>
        <button
          className="btn btn-outline-dark btn-sm me-2"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage} // stops me from breaking page limits
        >
          {`<<`}
        </button>
        <button
          className="btn btn-outline-dark btn-sm me-2"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {`<`}
        </button>
        <button
          className="btn btn-outline-dark btn-sm me-2"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {`>`}
        </button>
        <button
          className="btn btn-outline-dark btn-sm"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {`>>`}
        </button>
      </div>

      <div>
        <span>
          Page
          {` `}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
      </div>
    </div>
  </div>;
};
