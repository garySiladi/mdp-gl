import React from 'react';
import { Icon } from '../image';

type Props = {
  +title: string,
  +prediction: object,
  +probability: object, // FIXME:
};

const temporaryFormatPrediction = prediction => {
  if (prediction !== 'malign' && prediction !== 'benign') {
    return Number(prediction) > 0.5 ? 'malign' : 'benign';
  }
  return prediction;
};

const AnalysisResult = ({ title, prediction, probability }: Props) => {
  const formattedPrediction = temporaryFormatPrediction(prediction);
  return (
    <div className="analysis-result">
      <div>
        {formattedPrediction === 'malign' ? <Icon name="warning" className="result-alert" /> : null}
        <span className={`${ formattedPrediction }-result result-number`}>
          {`${ Math.round(probability * 100) }% `}
        </span>
        <span className="result-text">{formattedPrediction}</span>
      </div>
      <span className="result-title">{title}</span>
    </div>
  );
};

export default AnalysisResult;
