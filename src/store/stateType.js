// @flow
export type Patient = {
  +id: string,
  +name: string,
  +phone: string,
  +email: string,
  +studyCount: number,
  +lastStudyDate: Date,
}

export type Study = {
  +id: string,
  +patientId: string,
  +name: string,
  +date: Date,
  +sliceCount: number,
  +previewImage: string,
  +expectedResult: Array<number>,
  +actualResult: Array<number>,
}

export type PerformanceData = {
  +title: string,
  +values: Array<number>,
  +medianValues: Array<number>,
}

export type State = {
  +data: {
    patientList: Array<Patient>,
    studies: Array<Study>,
  },
  +selectedPatient: Patient,
  +selectedStudy: Study,
  +performance: PerformanceData,
};
