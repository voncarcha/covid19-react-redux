import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';

import { setTotal, setLoading as setSummaryLoading } from 'modules/summary';

export const dayoneSlice = createSlice({
  name: 'dayone',
  initialState: {
    isLoading: false,
    data: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setLoading, setData } = dayoneSlice.actions;

const API = 'https://api.covid19api.com';

export function getDayoneAsync(country) {
  return async (dispatch, getState) => {
    if (country === 'global') {
      const global = getState().summary.data.Global;
      dispatch(
        setTotal({
          confirmed: global.TotalConfirmed,
          deaths: global.TotalDeaths,
          recovered: global.TotalRecovered,
        }),
      );
      dispatch(setData([]));
    } else {
      try {
        dispatch(setLoading(true));
        dispatch(setSummaryLoading(true));
        const res = await axios.get(`${API}/dayone/country/${country}`);

        const flattenData = [];
        res.data.forEach((i) => {
          flattenData.push({
            confirmed: i.Confirmed,
            deaths: i.Deaths,
            recovered: i.Recovered,
            active: i.Active,
            countryName: i.Country,
            date: moment(i.Date).format('L'),
          });
        });

        // merge data with same dates
        const reduceData = flattenData.reduce((acc, obj) => {
          let existObj = acc.find((i) => i.date === obj.date);
          if (existObj) {
            existObj.confirmed = existObj.confirmed + obj.confirmed;
            existObj.deaths = existObj.deaths + obj.deaths;
            existObj.recovered = existObj.recovered + obj.recovered;
            return acc;
          }
          acc.push(obj);
          return acc;
        }, []);

        const countries = getState().summary.data.Countries;
        const selectedCountry = countries.find((c) => c.Slug === country);
        dispatch(
          setTotal({
            confirmed: selectedCountry.TotalConfirmed,
            deaths: selectedCountry.TotalDeaths,
            recovered: selectedCountry.TotalRecovered,
          }),
        );

        dispatch(setData(reduceData));
        dispatch(setLoading(false));
        dispatch(setSummaryLoading(false));
      } catch (err) {
        console.log(err);
      }
    }
  };
}

export const selectIsLoading = (state) => state.dayone.isLoading;
export const selectDayoneData = (state) => state.dayone.data;

export default dayoneSlice.reducer;
