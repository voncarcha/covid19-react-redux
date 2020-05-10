import React from 'react';
import { useDispatch } from 'react-redux';
import { Select } from 'antd';

import * as S from './styles';

const { Option } = Select;

function Search({ countries, getCountryDayOneAsync }) {
  const dispatch = useDispatch();

  const onChange = (value) => dispatch(getCountryDayOneAsync(value));

  return (
    <S.Wrapper>
      <Select
        showSearch
        style={{ width: '100%' }}
        placeholder="Select Country"
        onChange={onChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        defaultValue="global" 
        size="large"
      >
      <Option value='global'>
        -- Global --
      </Option>
        {countries
          ? countries.map((country, index) => (
              <Option value={country.Slug} key={index}>
                {country.Country}
              </Option>
            ))
          : null}
      </Select>
    </S.Wrapper>
  );
}

export default Search;
