import React from "react";
// import { VirtualTable } from "./components/AntdTable";
// import MainTable from "./components/MainTable";
// import VirtualList from "./components/VirtualList";
import VTable from "./components/VTable";
import VTHeader from "./components/VTHeader";
import CustomTable from "./main/CustomTable";
import CustomTableNew from "./main/CustomTableNew";

function App() {
  return (
    <div className="App">
      work
      {/* <VirtualList /> */}
      {/* <VTHeader />
      <VTable /> */}
      {/* <AntdTable />
       */}
      {/* <VirtualTable
        columns={columns}
        dataSource={data}
        scroll={{
          y: 300,
          x: "100vw",
        }}
      /> */}
      {/* <CustomTable /> */}
      <CustomTableNew />
    </div>
  );
}

export default App;
