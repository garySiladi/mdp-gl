// @flow
const ENDPOINT = 'http://172.20.39.140:3333/api';

const patientTemplate = {
  id: '1',
  name: 'Patient Dummy 1',
  phone: '+421 123 456 789',
  email: 'patient.dummy@email.com',
  lastStudyDate: '2017-08-23T10:19:28.893Z',
  studyCount: 1,
};

const studyTemplate = {
  patientId: '1',
  name: 'Sag T1 FSE',
  date: '2017-08-23T10:19:28.893Z',
};

const fetchData = url => fetch(`${ ENDPOINT }${ url }`, {
  method: 'GET',
}).then(response => response.json());

export const fetchPatients = (dispatchReceivedPatients: Function) => {
  fetchData('/patients')
    .then(values => {
      dispatchReceivedPatients(values.map(
        ({ PatientID, Name }) => ({
          ...patientTemplate,
          id: PatientID,
          name: Name,
        }),
      ));
    });
};

export const fetchStudies = (patientId: string, dispatchReceivedStudies: Function) => {
  Promise.all([
    fetchData(`/scans/${ patientId }`),
    fetchData(`/nodules/${ patientId }`),
    fetchData(`/analysis/${ patientId }`),
  ]).then(values => {
    dispatchReceivedStudies(values[0].map(
      scan => ({
        ...studyTemplate,
        id: scan._id, // eslint-disable-line no-underscore-dangle
        patientId,
        // scans,
        nodules: values[1],
        analysis: values[2],
      }),
    ));
  });
};

export const fetchPerformanceData = (dispatchReceivedPerformanceData: Function) => {
  fetchData('/training/ann')
    .then(values => {
      dispatchReceivedPerformanceData([
        'Accuracy - ANN',
        'Loss - ANN',
        'Validation Accuracy - ANN',
        'Validation Loss - ANN',
      ].map(
        (title, i) => ({
          title,
          values: values.map(entry => entry[i]),
          medianValues: null,
        }),
      ));
    });
};
