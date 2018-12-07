// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Icon } from '../image';
import { formatDate } from '../../util';

type Props = {
  +name: string,
  +nodules: Array,
  +date: Date,
};

const StudyInfo = ({ name, nodules = [], date }: Props) => (
  <div className="studyinfo">
    <span className="label study-name bold text-highlight">{name}</span>
    <Icon className="number-of-picture-icon label" name="numberOfPictures" />
    <span className="study-count bold text-light">{nodules.length}</span>
    <span className="label">Date of Study</span>
    <span className="last-study-date bold text-light">{formatDate(date)}</span>
    <Icon className="print-icon" name="printer" />
  </div>
);

const mapStateToProps = ({ selectedStudy: { name, nodules, date } }) => ({
  name,
  nodules,
  date,
});

export default connect(mapStateToProps)(StudyInfo);
