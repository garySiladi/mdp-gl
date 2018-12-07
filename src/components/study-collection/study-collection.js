import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { Study, Patient } from '../../store';
import { StudyCard } from '../study-card';
import { selectStudy } from '../../api';

type Props = {
  +studies: Array<Study>,
  +selectedPatient: Patient,
  +actions: {
    dispatchSelectStudy: Function,
  },
};

const StudyCollection = ({
  studies,
  selectedPatient,
  actions: {
    dispatchSelectStudy,
  },
}: Props) => {
  const renderedStudies = studies ? studies
    .filter(study => study.patientId === selectedPatient.id)
    .map(
      study => (
        <StudyCard
          cardData={study}
          onSelect={() => dispatchSelectStudy(study)}
          key={study.id}
        />
      ),
    ) : null;
  return (
    <div className="study-collection">
      {renderedStudies}
    </div>
  );
};

const mapStateToProps = state => ({
  selectedPatient: state.selectedPatient,
  studies: state.data.studies,
});

const mapDispatchToProps = dispatch => ({
  actions:
    bindActionCreators({
      dispatchSelectStudy: selectStudy,
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudyCollection);
