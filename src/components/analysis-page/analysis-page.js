// @flow
import React from 'react';
import AnalysisHeader from './analysis-header';
import { SectionHeader, PatientInfo, SectionTitle, StudyInfo } from '../section-header';


const Analysis = () => (
  <div className="analysis">
    <SectionHeader>
      <PatientInfo />
      <SectionTitle title="Analysis" />
      <StudyInfo />
    </SectionHeader>
    <div className="section-body">
      <AnalysisHeader />
    </div>
  </div>
);

export default Analysis;
