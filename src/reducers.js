import { combineReducers } from '@reduxjs/toolkit';

import covidReducer from 'modules/covid';

export default combineReducers({
  covid: covidReducer,
});
