/* eslint-disable react/prop-types */

import Cell from "../Cell/Cell";

const RowBox = (props) => {

  const {cells, rowIndex} = props; 

  return (
    <>
        <div className=" flex rounded-md duration-200 ">
      {cells.map((item, colIndex) => (
        <Cell
          item={item}
          rowIndex={rowIndex}
          colIndex={colIndex}
          key={colIndex}
        />
      ))}
    </div>
    </>
  )
}

export default RowBox