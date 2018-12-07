// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../image';
import type { Study } from '../../store';
import { formatDate } from '../../util';

type Props = {
  +cardData: Study,
  +onSelect: Function,
};

// TODO: Adding 'study-card-button' makes text centered, need to double check with designer
const StudyCard = ({
  cardData: {
    id,
    name,
    date,
    nodules,
  },
  onSelect,
}: Props) => (
  <div className="study-card">
    <a href={`/viewer/${ id }`} className="study-card-button study-card-body">
      <img
        src={nodules[0].NoduleImageFilepath} // TODO: image processing/component
        alt={name}
        className="preview-image"
      />
      <span className="text-highlight bold">{name}</span>
      <div className="study-card-text">
        <span>{formatDate(date)}</span>
        <Icon name="numberOfPictures" />
        <span className="text-light">{nodules.length}</span>
      </div>
    </a>
    <div className="study-card-buttons">
      <Link
        to={`/analysis/${ id }`}
        className="text-highlight study-card-button"
        onClick={onSelect}
      >Analysis</Link>
      <a href={`/viewer/${ id }`} className="text-highlight study-card-button">
        Detail
        <Icon name="rightArrowButton" />
      </a>
    </div>
  </div>
);

export default StudyCard;
