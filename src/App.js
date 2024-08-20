import React, { useState } from "react";
// import axios from "axios";

const App = () => {
  const [columns, setColumns] = useState({
    column1: ["Item1", "Item2"],
    column2: ["Item3", "Item4"],
    column3: ["Item5", "Item6"],
  });

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleOnDrop = (e, toColumn) => {
    const item = e.dataTransfer.getData("item");
    const fromColumn = e.dataTransfer.getData("fromColumn");
    setColumns((prevColumn) => {
      const newFromColumn = prevColumn[fromColumn].filter((i) => i !== item);
      const toNewColumn = [...prevColumn[toColumn], item];

      return {
        ...prevColumn,
        [fromColumn]: newFromColumn,
        [toColumn]: toNewColumn,
      };
    });
  };

  const handlOnDragStart = (e, item, fromColumn) => {
    console.log(columns);
    e.dataTransfer.setData("item", item);
    e.dataTransfer.setData("fromColumn", fromColumn);
  };

  return (
    <div className="h-screen w-full flex flex-row justify-center items-center gap-16">
      {Object.keys(columns).map((column) => (
        <div
          key={column}
          className="h-64 w-64 border flex flex-col gap-4 top-2 border-gray-500 p-2"
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleOnDrop(e, column)}
        >
          {columns[column].map((item) => (
            <div
              key={item}
              draggable
              onDragStart={(e) => handlOnDragStart(e, item, column)}
              className="w-full h-8 bg-gray-500"
            >
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;
