'use client';

import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import theme from '@styles/theme';
import { MarketInfo, UpbitCoinInfo } from '@type/upbit';

import { useRecoilState } from 'recoil';
import { marketCode, selectedCode } from '@recoil/atoms';

import { TbSettingsFilled } from 'react-icons/tb';
import { BsSearch } from 'react-icons/bs';
import { IoCloseCircle } from 'react-icons/io5';

const SearchBox = () => {
  const [selectedCoin, setSelectedCoin] = useRecoilState(selectedCode); // 선택한 코드
  const [marketCodeData, setMarketCodeData] = useRecoilState<MarketInfo>(marketCode); // 마켓 코드 조회
  const [data, setData] = useState<UpbitCoinInfo>(); // 선택한 코드의 정보
  const [searchValue, setSearchValue] = useState<string>(''); // 검색어

  return (
    <Wrapper>
      <Search>
        <Input
          placeholder="코인명/심볼검색"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        {searchValue === '' ? (
          <BsSearch size={20} color={theme.colors.primaryColor} />
        ) : (
          <IoCloseCircle
            size={20}
            color={theme.colors.primaryColor}
            onClick={() => {
              setSearchValue('');
            }}
          />
        )}
      </Search>

      <Setting>
        <TbSettingsFilled size={20} color={theme.colors.grayIconColor} />
      </Setting>
    </Wrapper>
  );
};

export default SearchBox;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 400px;
  height: 46px;
  background: ${theme.colors.whiteColor};
  margin-bottom: 4px;
`;
const Search = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  padding: 0 16px;
`;
const Input = styled.input`
  width: 100%;
  height: 100%;
  font-size: 14px;

  &:placeholder {
    color: ${theme.colors.ultraLightGrayFontColor};
  }
`;
const Setting = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 46px;
  height: 100%;
  border-left: 1px solid ${theme.colors.grayBorderColor};
`;
