import "react-virtualized/styles.css";
import "../components/ScrollSync.example.css";
import "antd/dist/antd.css";
import scrollbarSize from "dom-helpers/scrollbarSize";
import { Grid, AutoSizer, ScrollSync } from "react-virtualized";

import { useEffect, useRef, useState } from "react";
import VTHeader from "../components/VTHeader";
import { Checkbox } from "antd";

const columns = [
  {
    title: "",
    key: "selectAll",
    width: 50,
    fixed: true,
    render: () => <Checkbox />,
  },
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

export default function CustomTable() {
  const [widths, setWidths] = useState<number[]>([]);
  const [flatColumns, setFlatColumns] = useState<any>([]);
  const [fixedColumns, setFixedColumns] = useState<any>([]);
  const [fixedWidth, setFixedWidth] = useState<number>(0);

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

    if (flatColumns[columnIndex].render) {
      return (
        <div className={classNames} key={key} style={style}>
          {flatColumns[columnIndex].render()}
        </div>
      );
    }

    return (
      <div className={classNames} key={key} style={style}>
        {`R${rowIndex}, C${columnIndex}`}
      </div>
    );
  };

  const _renderBodyCell = ({ columnIndex, key, rowIndex, style }: any) => {
    if (flatColumns[columnIndex]?.fixed) {
      return <div key={key}></div>;
    }

    return _renderLeftSideCell({ columnIndex, key, rowIndex, style });
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
    // console.log(
    //   fixedColumns.reduce((sum: number, v: any, index: number) => {
    //     return sum + widths[index];
    //   }, 0)
    // );
    // setFixedWidth(100);
  }, [widths]);

  const onResizeCol = (index: number, width: number) => {
    const tempWidths = [...widths];
    tempWidths[index] = width;
    setWidths(tempWidths);
  };

  useEffect(() => {
    if (lGridRef.current) {
      // lGridRef.current.onScroll
    }
  }, []);

  useEffect(() => {
    // console.log(fixedWidth);
    // lGridRef.current?.forceUpdate();
    lGridRef.current?.recomputeGridSize();
  }, [fixedWidth]);

  useEffect(() => {
    // bGridRef.current?.forceUpdate();
    console.log("widths");
    setFixedWidth(widths[0] + widths[1] + widths[2]);

    bGridRef.current?.recomputeGridSize();
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
          console.log(x);

          const scroll = (event: any) => {
            // console.log(event.target.scrollLeft);
            onScroll({
              clientHeight,
              clientWidth,
              scrollHeight,
              scrollLeft: event?.target?.scrollLeft,
              scrollTop,
              scrollWidth,
            });
          };

          const onScrollTop = (event: any) => {
            console.log("top");
            console.log(event);
            // console.log(event.target.scrollLeft);
            onScroll({
              clientHeight,
              clientWidth,
              scrollHeight,
              scrollLeft,
              scrollTop: event.scrollTop,
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
                <div
                  style={{ height: scrollbarSize(), width: scrollWidth }}
                ></div>
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
                  fff
                </div>
                <div
                  className={"LeftSideGridContainer"}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 54,
                    // color: "white",
                    backgroundColor: `white`,
                  }}
                >
                  <Grid
                    ref={lGridRef}
                    className={`LeftSideGrid ${
                      x === 0 ? "" : "LeftSideGridShadow"
                    }`}
                    columnWidth={({ index }) => widths[index]}
                    columnCount={fixedColumns.length}
                    height={300 - 16}
                    onScroll={onScrollTop}
                    overscanColumnCount={2}
                    overscanRowCount={5}
                    cellRenderer={_renderLeftSideCell}
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
                        <VTHeader
                          width={width - scrollbarSize()}
                          scrollLeft={scrollLeft}
                          columns={columns}
                          flatColumns={flatColumns}
                          widths={widths}
                          onResizeCol={onResizeCol}
                        />
                        {/* </div> */}
                        <div
                          style={{
                            // backgroundColor: `aqua`,
                            // color: "white",
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
                            overscanColumnCount={2}
                            overscanRowCount={5}
                            cellRenderer={_renderBodyCell}
                            rowHeight={40}
                            rowCount={100}
                            width={width}
                            scrollTop={scrollTop}
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
