import React, { useEffect, useState } from 'react';
import { set } from 'react-hook-form';
import { useTable } from 'react-table';
import { AssessmentService } from '../../services/AssessmentService';

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);

  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js
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
  const columns = React.useMemo(() => [
    {
      accessor: `catName`,
      Header: `Cat Name`,
    },
    {
      accessor: `catDateOfBirth`,
      Header: `Date of Birth`,
    },
    {
      accessor: `instrumentType`,
      Header: `Instrument Type`,
    },
    {
      accessor: `riskLevel`,
      Header: `Risk Level`,
    },
    {
      accessor: `score`,
      Header: `Score`,
    },
  ], []);

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable({ columns, data: assessments });

  return <div>
    <table {...getTableProps()} style={{ border: `1px solid black`, width: `100%` }}>
      <thead>
        {headerGroups.map((headerGroup) =>
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column) =>
              <th
                {...column.getHeaderProps()}
                key={column.id}
                style={{ borderBottom: `2px solid black`, padding: `8px` }}
              >
                {column.render(`Header`)}
              </th>)}
          </tr>)}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return <tr {...row.getRowProps()} key={row.id}>
            {row.cells.map((cell) =>
              <td
                {...cell.getCellProps()}
                key={cell.column.id}
                style={{ border: `1px solid gray`, padding: `8px` }}
              >
                {cell.render(`Cell`)}
              </td>)}
          </tr>;
        })}
      </tbody>
    </table>
  </div>;
};
