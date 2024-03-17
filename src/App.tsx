import React, { useCallback, useState } from "react";

function Square({
  value,
  coord,
  handleClick,
}: {
  value: string | null;
  coord: [number, number];
  handleClick: (i: number, j: number) => void; // Modify the handleClick function signature
}) {
  return (
    <button className="square" onClick={() => handleClick(coord[0], coord[1])}>
      {value}
    </button>
  );
}

export default function Board({ m = 3, n = 3 }: { m?: number; n?: number }) {
  const initialBoard = Array.from({ length: m }, () => Array(n).fill(null));
  const [boardValues, setBoardValues] = useState(initialBoard); // stores board cell values

  const handleClick = useCallback(
    (i: number, j: number) => {
      console.log("Clicked on cell", i, j);

      setBoardValues((currentValues) => {
        // Make a shallow copy of the outer array
        const updatedValues = [...currentValues];
        // Make a shallow copy of the row you want to update
        const updatedRow = [...updatedValues[i]];
        // Update the value in the copied row
        updatedRow[j] = "X";
        // Replace the old row in the outer array with the updated row
        updatedValues[i] = updatedRow;

        // Return the updated array to set the new state
        return updatedValues;
      });
    },
    [boardValues]
  );

  const board: JSX.Element[] = []; // stores board UI
  for (let i = 0; i < m; i++) {
    const row: JSX.Element[] = [];

    for (let j = 0; j < n; j++) {
      row.push(
        <Square
          value={boardValues[i][j]}
          coord={[i, j]}
          handleClick={() => handleClick(i, j)}
        />
      );
    }

    board.push(
      <div key={i} className="board-row">
        {row}
      </div>
    );
  }

  return <>{board}</>;
}
