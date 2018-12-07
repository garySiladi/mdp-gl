// @flow
import React from 'react';

type Props = {
  +title: string,
};

const SectionTitle = ({ title }: Props) => (
  <div className="section-title">
    <span className="bold">
      {title}
    </span>
  </div>
);

export default SectionTitle;
