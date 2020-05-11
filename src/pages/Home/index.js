import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getSummaryAsync,
  selectIsLoading as selectSummaryIsLoading,
  selectSummaryData,
  selectTotal,
} from 'modules/summary';
import {
  getDayoneAsync,
  selectIsLoading as selectDayoneIsLoading,
  selectDayoneData,
} from 'modules/dayone';

import Cards from 'components/Cards';
import Search from 'components/Search';
import Charts from 'components/Charts';

import * as S from './styles';

function Home() {
  const dispatch = useDispatch();
  const summaryIsLoading = useSelector(selectSummaryIsLoading);
  const dayoneIsLoading = useSelector(selectDayoneIsLoading);
  const { Countries } = useSelector(selectSummaryData);
  const total = useSelector(selectTotal);
  const dayoneData = useSelector(selectDayoneData);

  useEffect(() => {
    dispatch(getSummaryAsync());
  }, [dispatch]);

  return (
    <S.Wrapper>
      <h1>COVID19 TRACKER</h1>

      <Search countries={Countries} getDayoneAsync={getDayoneAsync} />
      <Cards isLoading={summaryIsLoading} total={total} />
      <Charts dayoneData={dayoneData} isLoading={dayoneIsLoading} />
    </S.Wrapper>
  );
}

export default Home;
