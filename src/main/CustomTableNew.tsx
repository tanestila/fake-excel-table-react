import "react-virtualized/styles.css";
import "../components/ScrollSync.example.css";
import "antd/dist/antd.css";
import scrollbarSize from "dom-helpers/scrollbarSize";
import { AutoSizer, ScrollSync } from "react-virtualized";
import { VariableSizeGrid as Grid } from "react-window";

import { useCallback, useEffect, useRef, useState } from "react";
import VTHeader from "../components/VTHeader";
import { Checkbox } from "antd";
import { useWhyDidYouUpdate } from "ahooks";

const columnsf = [
  {
    titleText: "A",
    dataIndex: "key",
    title: <div>Aasas</div>,
    width: 150,
    fixed: true,
  },
  {
    title: "A1",
    dataIndex: "col1",
    width: 100,
    fixed: true,
  },
  {
    title: "B",
    children: [
      {
        title: "B1",
        dataIndex: "col1",
        width: 50,
      },
      {
        title: "B2",
        dataIndex: "col2",
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
    col1: "col1" + key,
    col2: "col2" + key,
  })
);

export default function CustomTableNew() {
  const [widths, setWidths] = useState<number[]>([]);
  const [flatColumns, setFlatColumns] = useState<any>([]);
  const [fixedColumns, setFixedColumns] = useState<any>([]);
  const [fixedWidth, setFixedWidth] = useState<number>(0);
  const [selectedKeys, setSelectedKeys] = useState<any[]>([]);
  const bGridRef = useRef<any>(null);
  const lGridRef = useRef<any>(null);
  const [columns, setColumns] = useState<any>([
    {
      title: "",
      key: "selectAll",
      width: 50,
      fixed: true,
      checkbox: true,
    },
    ...columnsf,
  ]);

  useWhyDidYouUpdate("table", {
    widths,
    flatColumns,
    fixedColumns,
    fixedWidth,
    selectedKeys,
    bGridRef,
    lGridRef,
    columns,
  });

  const [scale, setScale] = useState(0);

  const onWheelEvent = (event: any) => {
    // console.log("wheel");
    // console.log(event);
    // check
    bGridRef.current.scrollTo({ scrollTop: scale + 100 });
    setScale(scale + 100);
  };

  const handleKeyDown = (event: any) => {
    console.log("key press");
    console.log(event.code);
    console.log(scale);
    switch (event.code) {
      case "PageUp": // page up
        bGridRef.current.scrollTo({ scrollTop: scale - 100 });
        setScale(scale - 100);
        break;
      case "PageDown": // page down
        bGridRef.current.scrollTo({ scrollTop: scale + 100 });
        setScale(scale + 100);
        break;
      case "ArrowDown": // page down
        bGridRef.current.scrollTo({ scrollTop: scale + 100 });
        setScale(scale + 100);
        break;
      case "ArrowUp": // page up
        bGridRef.current.scrollTo({ scrollTop: scale - 100 });
        setScale(scale - 100);
        break;
    }
  };

  const onCheckboxChange = ({ record, key }: any) => {
    let temp = [...selectedKeys];
    console.log(key);
    console.log(temp.includes(key));
    if (temp.includes(key)) {
      temp = temp.filter((k) => k !== key);
    } else {
      temp.push(key);
    }
    setSelectedKeys(temp);
  };

  useEffect(() => {
    console.log(selectedKeys);
    lGridRef.current?.forceUpdate();
  }, [selectedKeys]);

  // const _renderLeftHeaderCell = ({
  //   columnIndex,
  //   key,
  //   rowIndex,
  //   style,
  // }: any) => {
  //   return (
  //     <span
  //       // className={"headerCell"}
  //       key={key}
  //       style={style}
  //     >
  //       {`C${columnIndex} ${rowIndex}`}
  //     </span>
  //   );
  // };

  const _renderLeftSideCell = ({
    columnIndex,
    rowIndex,
    style,
    isScrolling,
  }: any) => {
    // console.log(isScrolling);
    // if (isScrolling) {
    //   return (
    //     <div key={columnIndex + " " + rowIndex} style={style}>
    //       {"Scrolling"}
    //     </div>
    //   );
    // }

    const rowClass =
      rowIndex % 2 === 0
        ? columnIndex % 2 === 0
          ? "evenRow"
          : "oddRow"
        : columnIndex % 2 !== 0
        ? "evenRow"
        : "oddRow";
    const classNames = rowClass + " " + "cell";

    if (flatColumns[columnIndex].checkbox) {
      return (
        <div
          className={classNames}
          key={columnIndex + " " + rowIndex}
          style={style}
        >
          <Checkbox
            onChange={() =>
              onCheckboxChange({
                record: data[rowIndex],
                key: data[rowIndex].key,
              })
            }
            checked={selectedKeys.includes(data[rowIndex].key)}
          />
        </div>
      );
    }
    const colDataKey = flatColumns[columnIndex].dataIndex;
    const record = data[rowIndex];
    // console.log(record);
    // console.log(colDataKey);
    return (
      <div
        className={classNames}
        key={columnIndex + " " + rowIndex}
        style={style}
      >
        {record[colDataKey as keyof typeof record]}
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

    getFlatColumns([...columns]);

    setFixedColumns(tempFlatColumns.filter((col) => col.fixed));

    setFlatColumns([...tempFlatColumns]);
    setWidths(tempWidths);
  }, []);

  // useEffect(() => {
  //   // console.log(
  //   //   fixedColumns.reduce((sum: number, v: any, index: number) => {
  //   //     return sum + widths[index];
  //   //   }, 0)
  //   // );
  //   // setFixedWidth(100);
  // }, [widths]);

  const onResizeCol = useCallback(
    (index: number, width: number) => {
      const tempWidths = [...widths];
      tempWidths[index] = width;
      setWidths(tempWidths);
    },
    [widths]
  );

  useEffect(() => {
    if (lGridRef.current) {
      // lGridRef.current.onScroll
    }
  }, []);

  // useEffect(() => {
  //   // console.log(fixedWidth);
  //   // lGridRef.current?.forceUpdate();
  //   // lGridRef.current?.recomputeGridSize();
  // }, [fixedWidth]);

  useEffect(() => {
    // bGridRef.current?.forceUpdate();
    // console.log("widths");
    setFixedWidth(widths[0] + widths[1] + widths[2]);

    // bGridRef.current?.resetAfterIndices({
    //   columnIndex: 0,
    //   rowIndex: 0,
    //   shouldForceUpdate: false,
    // });

    bGridRef.current?.resetAfterColumnIndex(0, false);
  }, [widths]);

  // const BodyItemRender = ({ columnIndex, key, rowIndex, style }: any) => {
  //   const rowClass =
  //     rowIndex % 2 === 0
  //       ? columnIndex % 2 === 0
  //         ? "evenRow"
  //         : "oddRow"
  //       : columnIndex % 2 !== 0
  //       ? "evenRow"
  //       : "oddRow";
  //   const classNames = rowClass + " " + "cell";

  //   if (flatColumns[columnIndex].checkbox) {
  //     return (
  //       <div className={classNames} key={key} style={style}>
  //         <Checkbox
  //           onChange={() =>
  //             onCheckboxChange({
  //               record: data[rowIndex],
  //               key: data[rowIndex].key,
  //             })
  //           }
  //           checked={selectedKeys.includes(data[rowIndex].key)}
  //         />
  //       </div>
  //     );
  //   }
  //   const colDataKey = flatColumns[columnIndex].dataIndex;
  //   const record = data[rowIndex];
  //   console.log(record);
  //   console.log(colDataKey);
  //   return (
  //     <div className={classNames} key={key} style={style}>
  //       {record[colDataKey as keyof typeof record]}
  //     </div>
  //   );
  // };

  return (
    <div>
      <>
        {/* <div
          // onScroll={scroll}
          style={{
            height: scrollbarSize(),
            width: '100%,'
            overflow: "scroll",
          }}
        >
          <div style={{ height: scrollbarSize(), width: scrollWidth }}></div>
        </div> */}
        <div
          onWheel={onWheelEvent}
          // onKeyDown={handleKeyDown}
          className={"GridRow"}
        >
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
              className={`LeftSideGrid ${0 === 0 ? "" : "LeftSideGridShadow"}`}
              columnWidth={(index) => widths[index]}
              columnCount={fixedColumns.length}
              height={300 - 16}
              // onScroll={onScrollTop}
              overscanColumnCount={2}
              overscanRowCount={5}
              // cellRenderer={_renderLeftSideCell}
              rowHeight={(index) => 40}
              rowCount={100}
              // scrollTop={scrollTop}
              width={fixedWidth}
              useIsScrolling
            >
              {(props: any) => _renderLeftSideCell(props)}
            </Grid>
          </div>
          <div className={"GridColumn"}>
            <AutoSizer disableHeight>
              {({ width }) => (
                <div>
                  {/* <VTHeader
                          width={width - scrollbarSize()}
                          scrollLeft={scrollLeft}
                          columns={columns}
                          flatColumns={flatColumns}
                          widths={widths}
                          onResizeCol={onResizeCol}
                        /> */}
                  {/* </div> */}
                  <div
                    style={{
                      // backgroundColor: `aqua`,
                      // color: "white",
                      height: 300,
                      width,
                    }}
                    tabIndex={0}
                    // onKeyPress={handleKeyDown}
                    onKeyDown={handleKeyDown}
                  >
                    <Grid
                      // outerRef={(elementRefOrNull) => {
                      //   if (elementRefOrNull) {
                      //     elementRefOrNull.tabIndex = -1;
                      //   }
                      // }}
                      // useIsScrolling
                      style={{ overflow: "hidden" }}
                      ref={bGridRef}
                      className={"BodyGrid"}
                      columnWidth={(index) => widths[index] || 0}
                      columnCount={flatColumns.length}
                      height={300}
                      // onScroll={onScroll}
                      // scrollLeft={scrollLeft}
                      overscanColumnCount={2}
                      overscanRowCount={1}
                      // cellRenderer={_renderBodyCell}
                      rowHeight={(index) => 40}
                      rowCount={100}
                      width={width}
                      // onItemsRendered={(a) => {
                      //   console.log(a);
                      // }}
                      // scrollTop={scrollTop}
                      // onItemsRendered={_renderBodyCell}
                    >
                      {(props) => _renderLeftSideCell(props)}
                    </Grid>
                  </div>
                </div>
              )}
            </AutoSizer>
          </div>
        </div>
      </>
    </div>
  );
}
