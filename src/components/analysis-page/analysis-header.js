// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import AnalysisResult from './analysis-result';
import type { Study } from '../../store';

const results = [
  {
    title: 'ANN',
    key: 'ANN',
  },
  {
    title: 'ADA BOOST',
    key: 'ADA',
  },
  // {
  //   title: 'CNN',
  //   key: 'CNN',
  // },
  {
    title: 'TPOT',
    key: 'TPOT_full',
  },
  {
    title: 'TPOT-LIGHT',
    key: 'TPOT_light',
  },
  {
    title: 'RANDOM FOREST',
    key: 'RF',
  },
];

const AnalysisHeader = ({ selectedStudy }: Study) => selectedStudy.nodules ? (
  <div>
    {
      selectedStudy.nodules.map(nodule => (
        <AnalysisHeaderView
          key={String(nodule.NoduleID)}
          noduleID={nodule.NoduleID}
          previewImage={nodule.NoduleImageFilepath}
          analysis={selectedStudy.analysis.find(entry => entry.NoduleID === nodule.NoduleID)}
        />
      ))
    }
  </div>
) : null;

type Props = {
  +previewImage: string,
  +analysis: Array,
  +noduleID: string,
};

// TODO: remove analysis check
const AnalysisHeaderView = ({ previewImage, analysis, noduleID }: Props) => analysis ? (
  <div className="analysis-header">
    <div>
      <img src={previewImage} alt="..." className="analysis-image" />
    </div>
    <div className="analysis-data">
      <div className="analysis-data-header">
        <div className="analysis-diagnosis">
          <span>Diagnosis:</span>
          <span
            className={
              classnames('diagnosis-result', {
                [`${ analysis.Malignancy }-result`]: true,
              })
            }
          >
            {` ${ analysis.Malignancy }`}
          </span>
        </div>
        <div className="analysis-header-button">
          <Link to={`/model/${ noduleID }`} className="link-button">3D view</Link>
        </div>
      </div>
      <div className="analysis-data-results">
        {
          results.map(({ title, key }) => (
            <div key={key}>
              <AnalysisResult
                title={title}
                prediction={analysis[`${ key }_pred`]}
                probability={analysis[`${ key }_prob`]}
              />
            </div>
          ))
        }
      </div>
    </div>
  </div>
) : null;

AnalysisHeader.defaultProps = {
  selectedStudy: {
    nodules: [],
    analysis: [],
  },
};

const mapStateToProps = state => ({ selectedStudy: state.selectedStudy });

export default connect(mapStateToProps)(AnalysisHeader);
