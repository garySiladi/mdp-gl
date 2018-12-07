// @flow
import React from 'react';
import type { Node } from 'react';

type Props = {
  +children: Node,
};

const SectionHeader = ({ children }:Props) => (
  <div className="section-header">
    {children}
  </div>
);

export default SectionHeader;
