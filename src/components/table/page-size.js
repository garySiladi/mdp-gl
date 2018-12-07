import React from 'react';

type Props = {
  +onChange: Function,
};

const options = [20, 40, 80, 100, 250];

const PageSize = ({ onChange }: Props) => (
  <span className="page-size">
    <span className="bold text-light">Show</span>
    <select onChange={onChange}>
      {
        options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))
      }
    </select>
  </span>
);

export default PageSize;
