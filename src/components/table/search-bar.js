import React from 'react';
import { Icon } from '../image';

type Props = {
  +onChange: Function,
};

const SearchBar = ({ onChange }: Props) => (
  <span className="search-bar">
    <input
      onChange={onChange}
      placeholder="Search for Name or ID"
    />
    <Icon name="search" />
  </span>
);

export default SearchBar;
