// @flow
import React from 'react';
import { SectionHeader, PatientInfo, SectionTitle, StudyInfo } from '../section-header';
import { ModelViewer } from './';

type Props = {
  +match: object,
};

const ModelPage = ({ match }: Props) => (
  <div className="model-page">
    <SectionHeader>
      <PatientInfo />
      <SectionTitle title="3D view" />
      <StudyInfo />
    </SectionHeader>
    <div className="section-body viewer-container">
      <ModelViewer noduleID={match.params && match.params.id} />
    </div>
  </div>
);

export default ModelPage;
