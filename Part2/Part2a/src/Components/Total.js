import React from 'react'

const findTotal = (parts) => parts.reduce((sum, ele) => sum + ele.exercises, 0);

export const Total = (props) => (
  <div>
    <strong>{`Total of ${findTotal(props.parts)} exercises`}</strong>
  </div>
)