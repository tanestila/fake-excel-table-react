import React from "react";
import { useBlockLayout, useResizeColumns, useTable } from "react-table";
import { FixedSizeGrid, FixedSizeList, VariableSizeGrid } from "react-window";
import scrollbarWidth from "./scrollbarWidth";
import { data } from "./data";
import { columns } from "./columns";
import styled from "styled-components";
import AutoSizer from "react-virtualized-auto-sizer";

const Styles = styled.div`
  padding: 1rem;

  .table {
    display: inline-block;
    border-spacing: 0;
    border: 1px solid black;

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      white-space: nowrap;
      background: white;
      overflow: hidden;

      ${
        "" /* In this example we use an absolutely position resizer,
       so this is required. */
      }
      position: relative;

      :last-child {
        border-right: 1px solid black;
      }

      .resizer {
        display: inline-block;
        background: blue;
        width: 10px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;
        ${"" /* prevents from scrolling while dragging on touch devices */}
        touch-action:none;

        &.isResizing {
          background: red;
        }
      }
    }
  }
`;

function MainTable() {
  // const columns = React.useMemo(
  //   () => [
  //     {
  //       Header: "Row Index",
  //       accessor: (row: any, i: number) => i,
  //     },
  //     {
  //       Header: "Name",
  //       columns: [
  //         {
  //           Header: "First Name",
  //           accessor: "firstName",
  //         },
  //         {
  //           Header: "Last Name",
  //           accessor: "lastName",
  //         },
  //       ],
  //     },
  //     {
  //       Header: "Info",
  //       columns: [
  //         {
  //           Header: "Age",
  //           accessor: "age",
  //           width: 50,
  //         },
  //         {
  //           Header: "Visits",
  //           accessor: "visits",
  //           width: 60,
  //         },
  //         {
  //           Header: "Status",
  //           accessor: "status",
  //         },
  //         {
  //           Header: "Profile Progress",
  //           accessor: "progress",
  //         },
  //       ],
  //     },
  //   ],
  //   []
  // );

  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   useTable<Record<string, any>>({ columns, data });

  // console.log(headerGroups);

  const defaultColumn = React.useMemo(
    () => ({
      width: 150,
    }),
    []
  );

  const columnWidths = new Array(1000)
    .fill(true)
    .map(() => 75 + Math.round(Math.random() * 50));

  const scrollBarSize = React.useMemo(() => scrollbarWidth(), []);

  const Cell = ({
    columnIndex,
    rowIndex,
    style,
  }: {
    columnIndex: number;
    rowIndex: number;
    style: any;
  }) => (
    <div style={style}>
      Item {rowIndex},{columnIndex}
    </div>
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    totalColumnsWidth,
    prepareRow,
  } = useTable<Record<string, any>>(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout,
    useResizeColumns
  );

  const rowHeights = new Array(1000)
    .fill(true)
    .map(() => 25 + Math.round(Math.random() * 50));

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className="tr"
        >
          {row.cells.map((cell) => {
            return (
              <div {...cell.getCellProps()} className="td">
                {cell.render("Cell")}
              </div>
            );
          })}
        </div>
      );
    },
    [prepareRow, rows]
  );

  return (
    <Styles>
      <AutoSizer>
        {({ height, width }) => (
          <VariableSizeGrid
            columnCount={1000}
            columnWidth={(index) => columnWidths[index]}
            height={1000}
            rowCount={1000}
            rowHeight={(index) => rowHeights[index]}
            width={width}
          >
            {Cell}
          </VariableSizeGrid>
        )}
      </AutoSizer>

      <div {...getTableProps()} className="table">
        <div>
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => (
                <div {...column.getHeaderProps()} className="th">
                  {column.render("Header")}
                  {/* Use column.getResizerProps to hook up the events correctly */}
                  <div
                    //@ts-ignore
                    {...column.getResizerProps()}
                    className={`resizer ${
                      //@ts-ignore
                      column.isResizing ? "isResizing" : ""
                    }`}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div {...getTableBodyProps()}>
          {/* <FixedSizeList
            height={400}
            itemCount={rows.length}
            itemSize={35}
            width={totalColumnsWidth + scrollBarSize}
          >
            {RenderRow}
          </FixedSizeList> */}
          {/* <AutoSizer> */}
          {/* {({ height, width }) => ( */}
          <VariableSizeGrid
            columnCount={1000}
            columnWidth={(index) => columnWidths[index]}
            height={1000}
            rowCount={1000}
            rowHeight={(index) => rowHeights[index]}
            width={300}
          >
            {Cell}
          </VariableSizeGrid>
          {/* )} */}
          {/* </AutoSizer> */}
        </div>
      </div>

      {/* <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: "solid 3px red",
                  background: "aliceblue",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: "10px",
                      border: "solid 1px gray",
                      background: "papayawhip",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table> */}
    </Styles>
  );
}

export default MainTable;
