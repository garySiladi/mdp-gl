// @flow
import React from 'react';
import classnames from 'classnames';
import { icons } from '../../assets';

type Props = {
  +name: string,
  className?: string,
};

const Icon = ({ name, className }: Props) => {
  if (!icons[name]) {
    throw new Error(`Icon "${ name }" is not present in asset folder.`);
  }

  return (
    <img
      src={icons[name]}
      alt={name}
      className={classnames('icon', className)}
    />
  );
};

Icon.defaultProps = {
  className: '',
};

export default Icon;
