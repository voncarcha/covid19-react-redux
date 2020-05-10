import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getSummaryAsync,
  getCountryDayOneAsync,
  selectSummary,
  selectIsLoading,
  selectIsCountryLoading,
  selectDayOne,
  selectTotal,
} from 'modules/covid';

import Cards from 'components/Cards';
import Search from 'components/Search';
import Charts from 'components/Charts';

import * as S from './styles';

function Home() {
  const dispatch = useDispatch();
  const { Countries } = useSelector(selectSummary);
  const isLoading = useSelector(selectIsLoading);
  const isCountryLoading = useSelector(selectIsCountryLoading);
  const dayOne = useSelector(selectDayOne);
  const total = useSelector(selectTotal);

  useEffect(() => {
    dispatch(getSummaryAsync());
  }, [dispatch]);

  return (
    <S.Wrapper>
      <h1>COVID19 TRACKER</h1>

      <Search
        countries={Countries}
        getCountryDayOneAsync={getCountryDayOneAsync}
      />
      <Cards isLoading={isLoading} total={total} />
      <Charts dayOne={dayOne} isCountryLoading={isCountryLoading} />
    </S.Wrapper>
  );
}

export default Home;
