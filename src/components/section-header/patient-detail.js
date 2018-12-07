// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Icon } from '../image';

type Props = {
  +phone: string,
  +email: string,
};

const PatientDetail = (props: Props) => <PatientDetailView {...props} />;

const PatientDetailView = ({ phone, email }: Props) => (
  <div className="patient-detail">
    <div>
      <Icon name="phone" />
      <span className="text-light bold patient-phone">{phone}</span>
    </div>
    <div>
      <Icon name="mail" />
      <span className="text-highlight patient-email">{email}</span>
    </div>
  </div>
);

const mapStateToProps = ({ selectedPatient: { phone, email } }) => ({
  phone,
  email,
});

export default connect(mapStateToProps)(PatientDetail);
