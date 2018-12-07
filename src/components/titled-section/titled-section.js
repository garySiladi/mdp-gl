// @flow
import React from 'react';
import type { Node } from 'react';

type Props = {
  title: String,
  children: Node,
}

const TitledSection = ({ title, children }: Props) => (
  <div className="titled-section">
    <div className="title bold text-highlight">{title}</div>
    <div className="titled-section-body">
      {children}
    </div>
  </div>
);

export default TitledSection;
