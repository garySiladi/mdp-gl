// @flow
import type { PatientType, StudyType, PerformanceDataType } from '../store';

export const RECEIVED_PATIENTS = 'API/RECEIVED_PATIENTS';
export const SELECT_PATIENT = 'API/SELECT_PATIENT';
export const RECEIVED_STUDIES = 'API/RECEIVED_STUDIES';
export const SELECT_STUDY = 'API/SELECT_STUDY';
export const RECEIVED_PERFORMANCE_DATA = 'API/RECEIVED_PERFORMANCE_DATA';

type ReceivedPatientsType = {
  type: 'API/RECEIVED_PATIENTS',
  payload: Array<PatientType>,
};

type SelectPatientType = {
  type: 'API/SELECT_PATIENT',
  payload: PatientType,
};

type ReceivedStudiesType = {
  type: 'API/RECEIVED_STUDIES',
  payload: Array<StudyType>,
};

type SelectStudyType = {
  type: 'API/SELECT_STUDY',
  payload: StudyType,
};

type ReceivedPerformanceDataType = {
  type: 'API/RECEIVED_PERFORMANCE_DATA',
  payload: PerformanceDataType,
};

export type ActionType =
  | ReceivedPatientsType
  | SelectPatientType
  | ReceivedStudiesType
  | SelectStudyType
  | ReceivedPerformanceDataType;

export const receivedPatients = (patients: Array<PatientType>) => ({
  type: RECEIVED_PATIENTS,
  payload: patients,
});

export const selectPatient = (patient: PatientType) => ({
  type: SELECT_PATIENT,
  payload: patient,
});

export const receivedStudies = (studies: Array<StudyType>) => ({
  type: RECEIVED_STUDIES,
  payload: studies,
});

export const selectStudy = (study: StudyType) => ({
  type: SELECT_STUDY,
  payload: study,
});

export const receivedPerformanceData = (performance: Array<PerformanceDataType>) => ({
  type: RECEIVED_PERFORMANCE_DATA,
  payload: performance,
});
