'use client';

import React, { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import theme from '@styles/theme';
import { MarketInfo, UpbitCoinInfo } from '@type/upbit';

import { useRecoilState } from 'recoil';
import { marketCode, selectedCode } from '@recoil/atoms';

import { TbSettingsFilled } from 'react-icons/tb';
import { BsSearch } from 'react-icons/bs';
import { IoCloseCircle } from 'react-icons/io5';
import StyledCheckbox from '@components/styled/StyledCheckbox';

type SearchBoxProps = {
  isEnglish: boolean;
  isChangePrice: boolean;
  setIsEnglish: Dispatch<SetStateAction<boolean>>;
  setIsChangePriceh: Dispatch<SetStateAction<boolean>>;
};
const SearchBox = ({ isEnglish, isChangePrice, setIsEnglish, setIsChangePriceh }: SearchBoxProps) => {
  const [selectedCoin, setSelectedCoin] = useRecoilState(selectedCode); // 선택한 코드
  const [marketCodeData, setMarketCodeData] = useRecoilState<MarketInfo>(marketCode); // 마켓 코드 조회
  const [data, setData] = useState<UpbitCoinInfo>(); // 선택한 코드의 정보
  const [searchValue, setSearchValue] = useState<string>(''); // 검색어
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const modalRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const handleOutsideClose = (e: { target: any }) => {
      // useRef current에 담긴 엘리먼트 바깥을 클릭 시 모달 닫힘
      if (isModalOpen && !modalRef.current.contains(e.target)) setIsModalOpen(false);
    };
    document.addEventListener('click', handleOutsideClose);

    return () => document.removeEventListener('click', handleOutsideClose);
  }, [isModalOpen]);

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

      <Setting ref={modalRef}>
        <TbSettingsFilled size={20} color={theme.colors.grayIconColor} onClick={() => setIsModalOpen(!isModalOpen)} />
      </Setting>
      {isModalOpen && (
        <SelectModal ref={modalRef}>
          <Option
          // onClick={() => {
          //   setIsEnglish(true);
          //   setIsModalOpen(false);
          // }}
          >
            <StyledCheckbox
              checked={isEnglish}
              onChange={() => {
                setIsEnglish((prev) => !prev);
                // setIsModalOpen(false);
              }}
              label={'마켓 명 영문으로 표기'}
              checkboxId={'language'}
            />
          </Option>
          <Option>
            <StyledCheckbox
              checked={isChangePrice}
              onChange={() => {
                setIsChangePriceh((prev) => !prev);
              }}
              label={'전일 대비 등락 가격 표시'}
              checkboxId={'price'}
            />
          </Option>
        </SelectModal>
      )}
    </Wrapper>
  );
};

export default SearchBox;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 400px;
  height: 46px;
  position: relative;
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
const SelectModal = styled.div`
  content: '';
  position: absolute;
  display: block;
  background: ${theme.colors.whiteColor};
  width: 160px;
  height: 80px;
  top: calc(100% + 4px);
  right: 0;
  z-index: 10;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;
const Option = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
  height: 40px;
  padding: 6px 8px;
  font-size: 13px;
  color: ${theme.colors.grayFontColor};
  cursor: pointer;

  &:hover {
    color: ${theme.colors.darkFontColor};
    background: ${theme.colors.ultralightBlueBgColor};

    path {
      fill: ${theme.colors.darkFontColor};
    }
  }
`;
