import React from 'react';
import Table from "./Components/Table/Table";
import TableContextProvider from "./context/TableContextProvider";

function App() {
  return (
    <TableContextProvider>
      <Table/>
    </TableContextProvider>
  );
}

export default App;
