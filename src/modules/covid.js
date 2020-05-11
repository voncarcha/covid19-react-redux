import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import axios from 'axios';
import moment from 'moment';

export const covidSlice = createSlice({
  name: 'covid',
  initialState: {
    isLoading: true,
    isCountryLoading: false,
    summary: {},
    total: {
      confirmed: 0,
      deaths: 0,
      recovered: 0,
    },
    dayOne: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCountryLoading: (state, action) => {
      state.isCountryLoading = action.payload;
    },
    setSummary: (state, action) => {
      state.summary = action.payload;
    },
    setDayOne: (state, action) => {
      state.dayOne = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
  },
});

export const {
  setLoading,
  setSummary,
  setDayOne,
  setTotal,
  setCountryLoading,
} = covidSlice.actions;

const API = 'https://api.covid19api.com';

export function getSummaryAsync() {
  return async (dispatch, getState) => {
    try {
      const res = await axios.get(`${API}/summary`);
      dispatch(setSummary(res.data));

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

export function getCountryDayOneAsync(country) {
  return async (dispatch, getState) => {
    if (country === 'global') {
      const global = getState().covid.summary.Global;
      dispatch(
        setTotal({
          confirmed: global.TotalConfirmed,
          deaths: global.TotalDeaths,
          recovered: global.TotalRecovered,
        }),
      );
      dispatch(setDayOne([]))
    } else {
      try {
        dispatch(setCountryLoading(true));
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
        const finalData = flattenData.reduce((acc, obj) => {
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

        const countries = getState().covid.summary.Countries;
        const selectedCountry = countries.find((c) => c.Slug === country);
        dispatch(
          setTotal({
            confirmed: selectedCountry.TotalConfirmed,
            deaths: selectedCountry.TotalDeaths,
            recovered: selectedCountry.TotalRecovered,
          }),
        );

        dispatch(setDayOne(finalData));
        dispatch(setCountryLoading(false));

      } catch (err) {
        console.log(err);
      }
    }
  };
}

export const selectIsLoading = (state) => state.covid.isLoading;
export const selectIsCountryLoading = (state) => state.covid.isCountryLoading;
export const selectSummary = (state) => state.covid.summary;
export const selectTotal = (state) => state.covid.total;
export const selectDayOne = (state) => state.covid.dayOne;

export default covidSlice.reducer;
