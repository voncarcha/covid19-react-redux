import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import axios from 'axios';

export const summarySlice = createSlice({
  name: 'summary',
  initialState: {
    isLoading: false,
    data: {},
    total: {
      confirmed: 0,
      deaths: 0,
      recovered: 0,
    },
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
  },
});

export const {
  setLoading,
  setData,
  setTotal,
} = summarySlice.actions;

const API = 'https://api.covid19api.com';

export function getSummaryAsync() {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));

      const res = await axios.get(`${API}/summary`);
      dispatch(setData(res.data));

      const global = res.data.Global;
      dispatch(
        setTotal({
          confirmed: global.TotalConfirmed,
          deaths: global.TotalDeaths,
          recovered: global.TotalRecovered,
        }),
      );

      dispatch(setLoading(false));
    } catch (err) {
      message.error('Error: too many request, please refresh');
    }
  };
}

export const selectIsLoading = (state) => state.summary.isLoading;
export const selectSummaryData = (state) => state.summary.data;
export const selectTotal = (state) => state.summary.total;

export default summarySlice.reducer;
