import React from "react";
import { useVirtual } from "react-virtual";
import { data } from "./data";
import { columns } from "./columns";

export default function VirtualList() {
  const parentRef: any = React.useRef();

  const indexFromTo = (from: number, to: number) => {
    let newFrom = from;
    if (newFrom < 3) {
      newFrom = 4;
    }
    const arr = [];
    for (let index = newFrom; index < to; index++) {
      arr.push(index);
    }
    return arr;
  };

  const rowVirtualizer = useVirtual({
    size: 10000,
    parentRef,
    estimateSize: React.useCallback(() => 35, []),
    overscan: 5,
  });

  const columnVirtualizer = useVirtual({
    horizontal: true,
    size: 10000,
    parentRef,
    estimateSize: React.useCallback(() => 100, []),
    overscan: 5,
    rangeExtractor: React.useCallback((range) => {
      console.log(range);
      return [
        0,
        1,
        2,
        3,
        ...indexFromTo(range.start, range.end + range.overscan),
      ];
    }, []),
  });

  console.log(rowVirtualizer);

  return (
    <>
      header
      <div
        ref={parentRef}
        className="List"
        style={{
          height: `500px`,
          width: `500px`,
          overflow: "auto",
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.totalSize}px`,
            width: `${columnVirtualizer.totalSize}px`,
            position: "relative",
          }}
        >
          {rowVirtualizer.virtualItems.map((virtualRow: any) => (
            <React.Fragment key={virtualRow.index}>
              {columnVirtualizer.virtualItems.map((virtualColumn: any) => (
                <div
                  key={virtualColumn.index}
                  className={
                    // virtualColumn.index < 3 ? "sticky" : ""
                    virtualColumn.index % 2
                      ? virtualRow.index % 2 === 0
                        ? "ListItemOdd"
                        : "ListItemEven"
                      : virtualRow.index % 2
                      ? "ListItemOdd"
                      : "ListItemEven"
                  }
                  style={{
                    // position: virtualColumn.index < 3 ? "sticky" : "absolute",
                    // background: virtualColumn.index < 3 ? "white" : undefined,
                    // top: 0,
                    // left: 0,
                    // width: `${virtualColumn.size}px`,
                    // height: `${virtualRow.size}px`,
                    // transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,

                    ...(virtualColumn.index < 3
                      ? {
                          background: "#fff",
                          borderBottom: "1px solid #ddd",
                          // zIndex: 1,
                        }
                      : {}),
                    ...(virtualColumn.index < 3
                      ? {
                          position: "absolute",
                          transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                        }
                      : {
                          position: "absolute",
                          transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                        }),
                    top: 0,
                    left: 0,
                    width: `${virtualColumn.size}px`,
                    height: `${virtualRow.size}px`,
                  }}
                >
                  Cell {virtualRow.index}, {virtualColumn.index}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
