// @flow
import { combineReducers } from 'redux';
import {
  receiveDataReducer,
  selectPatientReducer,
  selectStudyReducer,
  receivePerformanceReducer,
} from '../api';

const combinedReducers = combineReducers({
  data: receiveDataReducer,
  selectedPatient: selectPatientReducer,
  selectedStudy: selectStudyReducer,
  performance: receivePerformanceReducer,
});

export default combinedReducers;
