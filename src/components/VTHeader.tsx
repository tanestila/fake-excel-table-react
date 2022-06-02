import { CaretUpOutlined } from "@ant-design/icons";
import { useWhyDidYouUpdate } from "ahooks";
import { Button, Dropdown } from "antd";
import React, { useEffect, useRef } from "react";
import { Resizable } from "react-resizable";

const structure = [
  {
    title: "col 1",
    filterable: true,
    sortable: true,
    fixed: true,
    key: "col1",
    width: 50,
  },
  {
    title: "col 2",
    filterable: true,
    sortable: true,
    fixed: true,
    key: "col2",
    width: 100,
  },

  {
    title: "col 3",
    filterable: true,
    sortable: true,
    fixed: false,
    key: "col3",
    width: 50,
  },
  {
    title: "col 4",
    filterable: false,
    sortable: false,
    fixed: false,
    children: [
      {
        title: "col 5",
        filterable: true,
        sortable: true,
        fixed: false,
        key: "col5",
        width: 50,
      },
      {
        title: "col 6",
        filterable: true,
        sortable: true,
        fixed: false,
        key: "col6",
        width: 80,
      },
    ],
    key: "col4",
  },
];

function parseHeaderRows(
  rootColumns: Record<string, any>[]
): Record<string, any>[][] {
  const rows: Record<string, any>[][] = [];

  function fillRowCells(
    columns: Record<string, any>[],
    colIndex: number,
    rowIndex: number = 0
  ): number[] {
    // Init rows
    rows[rowIndex] = rows[rowIndex] || [];

    let currentColIndex = colIndex;
    const colSpans: number[] = columns.filter(Boolean).map((column) => {
      const cell: Record<string, any> = {
        key: column.key,
        className: column.className || "",
        children: column.title,
        column,
        colStart: currentColIndex,
        colIndex: currentColIndex,
      };

      let colSpan: number = 1;

      const subColumns = column.children;
      if (subColumns && subColumns.length > 0) {
        colSpan = fillRowCells(
          subColumns,
          currentColIndex,
          rowIndex + 1
        ).reduce((total, count) => total + count, 0);
        cell.hasSubColumns = true;
        cell.colIndex += "n";
      }

      // console.log(currentColIndex);
      // console.log(cell);

      if ("colSpan" in column) {
        ({ colSpan } = column);
      }

      if ("rowSpan" in column) {
        cell.rowSpan = column.rowSpan;
      }

      cell.colSpan = colSpan;
      cell.colEnd = cell.colStart + colSpan - 1;
      rows[rowIndex].push(cell);

      currentColIndex += colSpan;

      return colSpan;
    });

    return colSpans;
  }

  // Generate `rows` cell data
  fillRowCells(rootColumns, 0);

  // Handle `rowSpan`
  const rowCount = rows.length;
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
    rows[rowIndex].forEach((cell) => {
      if (!("rowSpan" in cell) && !cell.hasSubColumns) {
        // eslint-disable-next-line no-param-reassign
        cell.rowSpan = rowCount - rowIndex;
      }
    });
  }

  return rows;
}

export default function VTHeader({
  columns = [],
  flatColumns = [],
  scrollLeft = 0,
  width = 0,
  widths = [],
  onResizeCol,
}: any) {
  const tHeader: any = useRef(null);
  // console.log(scrollLeft);

  useWhyDidYouUpdate("header", {
    columns,
    flatColumns,
    scrollLeft,
    width,
    widths,
    onResizeCol,
  });

  useEffect(() => {
    if (tHeader.current) {
      tHeader.current.scrollLeft = scrollLeft;
      // tHeader.current.scrollTo({ scrollLeft });
    }
  }, [scrollLeft]);

  const getLeftPosition = (index: number) => {
    if (index === 0) {
      return 0;
    } else {
      return widths.reduce((sum: number, value: number, i: number) => {
        if (i < index) {
          return sum + value;
        } else {
          return sum;
        }
      }, 0);
    }
  };

  const onResize = (
    e: any,
    { size: { width } }: any,
    index: number | string
  ) => {
    e.preventDefault();
    if (typeof index === "number") {
      onResizeCol(index, width);
    }
  };

  const rows = parseHeaderRows(columns);
  // console.log(rows);
  // console.log(flatColumns);
  return (
    <div
      ref={tHeader}
      style={{
        width: width,
        overflow: "hidden",
      }}
    >
      <table
        style={{
          width: widths.reduce((sum: number, v: number) => {
            return sum + v;
          }, 0),
          tableLayout: "fixed",
          borderSpacing: 0,
        }}
      >
        <colgroup>
          {widths.map((c: any) => (
            <col width={c + "px"}></col>
          ))}
        </colgroup>
        <thead>
          {rows.map((row, rowIndex) => {
            return (
              <tr key={rowIndex} style={{ background: "#fafafa" }}>
                {row.map((c) => {
                  return (
                    <Resizable
                      draggableOpts={{ enableUserSelectHack: false }}
                      handle={
                        <div
                          style={{
                            top: 0,
                            position: "absolute",
                            right: "0",
                            bottom: 0,
                            cursor: "col-resize",
                            height: "100%",
                            width: "3px",
                            background: "black",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width: "3px",
                              background: "black",
                            }}
                          />
                        </div>
                      }
                      height={0}
                      width={widths[c.colIndex] || 0}
                      onResize={(e, p) => {
                        onResize(e, p, c.colIndex);
                      }}
                      // minConstraints={[80, 80]}
                    >
                      <th
                        style={{
                          position:
                            c.colIndex === 0 ||
                            c.colIndex === 1 ||
                            c.colIndex === 2
                              ? "sticky"
                              : "relative",
                          left:
                            c.colIndex === 0 ||
                            c.colIndex === 1 ||
                            c.colIndex === 2
                              ? getLeftPosition(c.colIndex)
                              : 0,
                          width: widths[c.colIndex],
                          borderBottom: "1px solid #f0f0f0",
                          color: "rgba(0,0,0,0.85)",
                          fontWeight: 500,
                          textAlign: "left",
                          padding: "2px 8px",
                        }}
                        colSpan={c.colSpan}
                        rowSpan={c.rowSpan}
                      >
                        {c.column.title}

                        <Dropdown
                          overlay={
                            <div style={{ background: "white" }}>sdsdsd</div>
                          }
                          placement="bottomLeft"
                          arrow
                        >
                          <CaretUpOutlined />
                        </Dropdown>
                      </th>
                    </Resizable>
                  );
                })}
              </tr>
            );
          })}
        </thead>
      </table>
    </div>
  );
}
