import React from 'react';
import { Spin } from 'antd';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

import * as S from './styles';

function Charts({ dayOne, isCountryLoading }) {
  return (
    <S.Wrapper>
      {dayOne.length !== 0 ? (
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={dayOne}>
            <defs>
              <linearGradient id="colorConfirmed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorRecovered" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorDeaths" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e02828" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#e02828" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip labelFormatter={(value) => `${value}`} />
            <Area
              type="monotone"
              dataKey="confirmed"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorConfirmed)"
            />
            <Area
              type="monotone"
              dataKey="recovered"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorRecovered)"
            />
            <Area
              type="monotone"
              dataKey="deaths"
              stroke="#e02828"
              fillOpacity={1}
              fill="url(#colorDeaths)"
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : null}
      {isCountryLoading ? <Spin tip="Fetching data..." /> : null}
    </S.Wrapper>
  );
}

export default Charts;
