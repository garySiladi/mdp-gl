// @flow
import React from 'react';
import { Icon } from '../image';
import { history } from '../../app';

const BackButton = () => (
  <div
    className="back-button"
    onClick={history.goBack}
    role="button"
    tabIndex={0}
  >
    <Icon name="backArrow" />
  </div>
);

export default BackButton;
