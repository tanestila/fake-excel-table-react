import "react-virtualized/styles.css";
import "./ScrollSync.example.css";
import "antd/dist/antd.css";
import scrollbarSize from "dom-helpers/scrollbarSize";
// You can import any component you want as a named export from 'react-virtualized', eg
import {
  Grid,
  AutoSizer,
  ScrollSync,
  defaultCellRangeRenderer,
  Collection,
  Index,
} from "react-virtualized";

import React, { UIEventHandler, useEffect, useRef, useState } from "react";
import VTHeader from "./VTHeader";

const columns = [
  {
    title: "A",
    dataIndex: "key",
    width: 150,
    fixed: true,
  },
  {
    title: "A1",
    dataIndex: "key",
    width: 100,
    fixed: true,
  },
  {
    title: "B",
    children: [
      {
        title: "B1",
        dataIndex: "key",
        width: 50,
      },
      {
        title: "B2",
        dataIndex: "key",
        width: 80,
      },
    ],
  },
  {
    title: "C",
    dataIndex: "key",
    width: 130,
  },
  {
    title: "D",
    dataIndex: "key",
    width: 260,
  },
  {
    title: "E",
    dataIndex: "key",
    width: 200,
  },
  {
    title: "F",
    dataIndex: "key",
    width: 100,
  },
  {
    title: "G",
    dataIndex: "key",
    width: 100,
  },
  {
    title: "J",
    dataIndex: "key",
    width: 100,
  },
];

const data = Array.from(
  {
    length: 100,
  },
  (_, key) => ({
    key,
  })
);

function cellRangeRenderer1(props: any) {
  console.log(props);
  const children = defaultCellRangeRenderer(props);

  children.push(<div>My custom overlay</div>);
  return children;
}

function cellRangeRenderer({
  cellCache, // Temporary cell cache used while scrolling
  cellRenderer, // Cell renderer prop supplied to Grid
  columnSizeAndPositionManager, // @see CellSizeAndPositionManager,
  columnStartIndex, // Index of first column (inclusive) to render
  columnStopIndex, // Index of last column (inclusive) to render
  horizontalOffsetAdjustment, // Horizontal pixel offset (required for scaling)
  isScrolling, // The Grid is currently being scrolled
  rowSizeAndPositionManager, // @see CellSizeAndPositionManager,
  rowStartIndex, // Index of first row (inclusive) to render
  rowStopIndex, // Index of last row (inclusive) to render
  scrollLeft, // Current horizontal scroll offset of Grid
  scrollTop, // Current vertical scroll offset of Grid
  styleCache, // Temporary style (size & position) cache used while scrolling
  verticalOffsetAdjustment, // Vertical pixel offset (required for scaling)
}: any) {
  const renderedCells: any[] = [];
  for (let rowIndex = rowStartIndex; rowIndex <= rowStopIndex; rowIndex++) {
    // This contains :offset (top) and :size (height) information for the cell
    let rowDatum = rowSizeAndPositionManager.getSizeAndPositionOfCell(rowIndex);

    for (
      let columnIndex = columnStartIndex;
      columnIndex <= columnStopIndex;
      columnIndex++
    ) {
      // This contains :offset (left) and :size (width) information for the cell
      let columnDatum =
        columnSizeAndPositionManager.getSizeAndPositionOfCell(columnIndex);

      // Be sure to adjust cell position in case the total set of cells is too large to be supported by the browser natively.
      // In this case, Grid will shift cells as a user scrolls to increase cell density.
      let left = columnDatum.offset + horizontalOffsetAdjustment;
      let top = rowDatum.offset + verticalOffsetAdjustment;

      // The rest of the information you need to render the cell are contained in the data.
      // Be sure to provide unique :key attributes.
      let key = `${rowIndex}-${columnIndex}`;
      let height = rowDatum.size;
      let width = columnDatum.size;

      const renderedCell = cellRenderer({
        columnIndex,
        isScrolling,
        rowIndex,
      });
      // Now render your cell and additional UI as you see fit.
      // Add all rendered children to the :renderedCells Array.

      renderedCells.push(
        <div
          key={key}
          style={{
            position: "absolute",
            top: top,
            left,
            height,
            width,
          }}
        >
          {renderedCell}
        </div>
      );
    }
  }

  return renderedCells;
}

export default function VTable() {
  const [widths, setWidths] = useState<any>([]);
  const [flatColumns, setFlatColumns] = useState<any>([]);
  const [fixedColumns, setFixedColumns] = useState<any>([]);
  const [fixedWidth, setFixedWidth] = useState<any>([]);

  const bGridRef = useRef<any>(null);
  const lGridRef = useRef<any>(null);

  const _renderLeftHeaderCell = ({
    columnIndex,
    key,
    rowIndex,
    style,
  }: any) => {
    return (
      <span
        // className={"headerCell"}
        key={key}
        style={style}
      >
        {`C${columnIndex} ${rowIndex}`}
      </span>
    );
  };

  const _renderLeftSideCell = ({ columnIndex, key, rowIndex, style }: any) => {
    const rowClass =
      rowIndex % 2 === 0
        ? columnIndex % 2 === 0
          ? "evenRow"
          : "oddRow"
        : columnIndex % 2 !== 0
        ? "evenRow"
        : "oddRow";
    const classNames = rowClass + " " + "cell";

    return (
      <div className={classNames} key={key} style={style}>
        {`R${rowIndex}, C${columnIndex}`}
      </div>
    );
  };

  const _renderBodyCell = ({ columnIndex, key, rowIndex, style }: any) => {
    if (flatColumns[columnIndex]?.fixed) {
      return;
    }

    return _renderLeftSideCell({ columnIndex, key, rowIndex, style });
  };

  const _renderHeaderCell = ({ columnIndex, key, rowIndex, style }: any) => {
    if (columnIndex < 1) {
      return;
    }

    return _renderLeftHeaderCell({ columnIndex, key, rowIndex, style });
  };

  const _renderHeaderCell1 = ({ columnIndex, rowIndex }: any) => {
    if (rowIndex === 0) {
      return columnIndex % 3 === 0 ? (
        <div style={{ width: 75 * 3 }}>{`C${columnIndex}-long-long-long`}</div>
      ) : (
        <div style={{ display: "none" }} />
      );
    } else {
      return <div>{`C${columnIndex}`}</div>;
    }
  };

  useEffect(() => {
    let tempFlatColumns: any[] = [];
    let tempWidths: number[] = [];

    const getFlatColumns = (columnsArray: any[]) => {
      for (let index = 0; index < columnsArray.length; index++) {
        const el = columnsArray[index];

        if (!el.children) {
          tempFlatColumns.push(el);
          tempWidths.push(el.width);
        } else {
          getFlatColumns(el.children);
        }
      }
    };

    getFlatColumns(columns);

    setFixedColumns(tempFlatColumns.filter((col) => col.fixed));

    setFlatColumns(tempFlatColumns);
    setWidths(tempWidths);
  }, []);

  useEffect(() => {
    setFixedWidth(
      fixedColumns.reduce((sum: number, v: any) => {
        return sum + v.width;
      }, 0)
    );
  }, [fixedColumns]);

  const onResizeCol = (index: number, width: number) => {
    const tempWidths = [...widths];
    tempWidths[index] = width;
    setWidths(tempWidths);
  };

  useEffect(() => {
    // bGridRef.current?.forceUpdate();
    bGridRef.current?.recomputeGridSize();
    lGridRef.current?.forceUpdate();
    lGridRef.current?.recomputeGridSize();
  }, [widths]);

  return (
    <div>
      <ScrollSync>
        {({
          clientHeight,
          clientWidth,
          onScroll,
          scrollHeight,
          scrollLeft,
          scrollTop,
          scrollWidth,
        }: any) => {
          const x = scrollLeft / (scrollWidth - clientWidth);
          const y = scrollTop / (scrollHeight - clientHeight);
          // console.log(onScroll);

          const scroll = (event: any) => {
            // console.log(event.target.scrollLeft);
            onScroll({
              clientHeight,
              clientWidth,
              scrollHeight,
              scrollLeft: event.target.scrollLeft,
              scrollTop,
              scrollWidth,
            });
          };

          return (
            <>
              <div
                onScroll={scroll}
                style={{
                  height: scrollbarSize(),
                  width: clientWidth,
                  overflow: "scroll",
                }}
              >
                <div style={{ height: 12, width: scrollWidth }}></div>
              </div>
              <div className={"GridRow"}>
                <div
                  className={"LeftSideGridContainer"}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    color: "white",
                    backgroundColor: `gray`,
                  }}
                >
                  {/* <VTHeader
                    width={fixedWidth - 12}
                    // scrollLeft={scrollLeft}
                    columns={fixedColumns}
                    flatColumns={fixedColumns}
                    widths={fixedColumns.map((c: any) => c.width)}
                    onResizeCol={onResizeCol}
                  /> */}
                  {/* <Grid
                    cellRenderer={_renderLeftHeaderCell}
                    className={"HeaderGrid"}
                    width={fixedWidth}
                    height={46}
                    rowHeight={40}
                    columnWidth={({ index }) => widths[index] || 10}
                    rowCount={1}
                    columnCount={fixedColumns.length}
                  /> */}
                </div>
                <div
                  className={"LeftSideGridContainer"}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 46,
                    color: "white",
                    backgroundColor: `grey`,
                  }}
                >
                  <Grid
                    ref={lGridRef}
                    overscanColumnCount={1}
                    overscanRowCount={5}
                    cellRenderer={_renderLeftSideCell}
                    columnWidth={({ index }) => widths[index] || 10}
                    columnCount={fixedColumns.length}
                    className={"LeftSideGrid"}
                    height={300 - 16}
                    rowHeight={40}
                    rowCount={100}
                    scrollTop={scrollTop}
                    width={fixedWidth}
                  />
                </div>
                <div className={"GridColumn"}>
                  <AutoSizer disableHeight>
                    {({ width }) => (
                      <div>
                        {/* <div
                          style={{
                            backgroundColor: `gray`,
                            color: "white",
                            // height: 80,
                            // width: width - 12,
                          }}
                        > */}
                        {/* <Grid
                            className={"HeaderGrid"}
                            columnWidth={75}
                            columnCount={flatColumns.length}
                            height={80}
                            overscanColumnCount={1}
                            cellRenderer={_renderHeaderCell}
                            rowHeight={40}
                            rowCount={2}
                            scrollLeft={scrollLeft}
                            width={width - 12}
                            cellRangeRenderer={cellRangeRenderer}
                          /> */}

                        <VTHeader
                          width={width - 12}
                          scrollLeft={scrollLeft}
                          columns={columns}
                          flatColumns={flatColumns}
                          widths={widths}
                          onResizeCol={onResizeCol}
                        />
                        {/* </div> */}
                        <div
                          style={{
                            backgroundColor: `aqua`,
                            color: "white",
                            height: 300,
                            width,
                          }}
                        >
                          <Grid
                            ref={bGridRef}
                            className={"BodyGrid"}
                            columnWidth={({ index }) => widths[index] || 0}
                            columnCount={flatColumns.length}
                            height={300}
                            onScroll={onScroll}
                            scrollLeft={scrollLeft}
                            overscanColumnCount={1}
                            overscanRowCount={5}
                            cellRenderer={_renderBodyCell}
                            rowHeight={40}
                            rowCount={100}
                            width={width}
                          />
                        </div>
                      </div>
                    )}
                  </AutoSizer>
                </div>
              </div>
            </>
          );
        }}
      </ScrollSync>
    </div>
  );
}
