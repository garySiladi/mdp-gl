// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Icon } from '../image';

type Props = {
  +name: string,
  +id: string,
  disableLink?: boolean,
};

const PatientInfo = (props: Props) => <PatientInfoView {...props} />;

PatientInfo.defaultProps = {
  disableLink: false,
};

const PatientInfoView = ({ name, id, disableLink }: Props) => (
  <Link
    to={`/patient/${ id }`}
    className={classnames('patient-info', {
      'disabled-link': disableLink,
    })}
  >
    <div>
      <Icon name="patientAvatar" />
      <span className="text-highlight bold patient-name">{name}</span>
    </div>
    <div className="patient-id">
      <span>{'ID: '}</span>
      <span className="bold id">{id}</span>
    </div>
  </Link>
);

PatientInfoView.defaultProps = {
  disableLink: false,
};

const mapStateToProps = ({ selectedPatient: { name, id } }) => ({
  name,
  id,
});

export default connect(mapStateToProps)(PatientInfo);

