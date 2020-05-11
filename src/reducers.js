import { combineReducers } from '@reduxjs/toolkit';

import summaryReducer from 'modules/summary';
import dayoneReducer from 'modules/dayone';

export default combineReducers({
  summary: summaryReducer,
  dayone: dayoneReducer,
});
