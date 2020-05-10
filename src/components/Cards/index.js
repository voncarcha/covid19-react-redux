import React from 'react';
import { Card, Statistic, Skeleton } from 'antd';

import iconConfirmed from 'images/icon-confirmed.svg';
import iconDeaths from 'images/icon-deaths.svg';
import iconRecovered from 'images/icon-recovered.svg';

import * as S from './styles';

function Cards({ isLoading, total }) {
  return (
    <S.Wrapper>
      <li>
        <Card title="Total Confirmed">
          {isLoading ? (
            <Skeleton active />
          ) : (
            <section>
              <img src={iconConfirmed} alt="" />
              <Statistic value={total.confirmed} className="confirmed" />
            </section>
          )}
        </Card>
      </li>
      <li>
        <Card title="Total Deaths">
          {isLoading ? (
            <Skeleton active />
          ) : (
            <section>
              <img src={iconDeaths} alt="" />
              <Statistic value={total.deaths} className="deaths" />
            </section>
          )}
        </Card>
      </li>
      <li>
        <Card title="Total Recovered">
          {isLoading ? (
            <Skeleton active />
          ) : (
            <section>
              <img src={iconRecovered} alt="" />
              <Statistic value={total.recovered} className="recovered" />
            </section>
          )}
        </Card>
      </li>
    </S.Wrapper>
  );
}

export default Cards;
