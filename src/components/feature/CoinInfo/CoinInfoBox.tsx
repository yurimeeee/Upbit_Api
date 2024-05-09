'use client';

import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import theme from '@styles/theme';
import { MarketInfo, UpbitCoinInfo } from '@type/upbit';
import { FlexBox, MediumFont, RegularFont, SemiBoldFont } from '@components/styled/StyledComponents';

import { useRecoilState } from 'recoil';
import { marketCode, selectedCode } from '@recoil/atoms';
import { Loader, SymbolImg } from '../Table/table.style';
import { changeCodeName, formatPercentDecimal, numberFormatter } from '@utils/formatter';

import RiseSign from '@assets/icons/rise_sign.svg';
import FallSign from '@assets/icons/fall_sign.svg';

// import RiseSign from '@assets/icons/RiseSign';
// import FallSign from '@assets/icons/FallSign';
import Image from 'next/image';

const CoinInfoBox = () => {
  const [selectedCoin, setSelectedCoin] = useRecoilState(selectedCode); // 선택한 코드
  const [marketCodeData, setMarketCodeData] = useRecoilState<MarketInfo>(marketCode); // 마켓 코드 조회
  const [data, setData] = useState<UpbitCoinInfo>(); // 선택한 코드의 정보

  const fetchData = async () => {
    try {
      const options = { method: 'GET', headers: { Accept: 'application/json' } };
      const response = await fetch(`https://api.upbit.com/v1/ticker?markets=${selectedCoin}`, options);
      const result = await response.json();
      setData(result[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, [selectedCoin]);

  useEffect(() => {
    fetchData(); // 초기 데이터 불러오기
    const intervalId = setInterval(fetchData, 500); // 0.5초마다 데이터 업데이트

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 clearInterval
  }, [selectedCoin]);

  return (
    <Wrapper>
      {data ? (
        <Contents>
          <FlexBox $flexDirection={'column'} $alignItems={'start'}>
            <FlexBox $gap={'10px'} $margin={'0 0 10px 0'}>
              <SymbolImg src={`https://static.upbit.com/logos/${changeCodeName(data.market)}.png`} />
              <SemiBoldFont $fontSize={20}>{Array.isArray(marketCodeData) && marketCodeData.filter((code: any) => code?.market === data.market)[0]?.korean_name}</SemiBoldFont>
              <RegularFont $fontSize={14} $fontColor={theme.colors.grayFontColor}>
                {data?.market}
              </RegularFont>
            </FlexBox>

            <FlexBox $gap={'4px'} $margin={'0 0 0 10px'}>
              <SemiBoldFont $fontSize={28} $fontColor={data.change === 'RISE' ? theme.colors.activeRed : theme.colors.activeBlue}>
                {numberFormatter(data.trade_price)}
              </SemiBoldFont>
              <RegularFont $fontSize={16} $fontColor={data.change === 'RISE' ? theme.colors.activeRed : theme.colors.activeBlue} $margin={'6px 0 0 0'}>
                KRW
              </RegularFont>
            </FlexBox>

            <FlexBox $gap={'8px'} $margin={'0 0 0 10px'}>
              <SemiBoldFont $fontSize={16} $fontColor={data.change === 'RISE' ? theme.colors.activeRed : theme.colors.activeBlue}>
                {formatPercentDecimal(data.signed_change_rate)}%
              </SemiBoldFont>
              <SemiBoldFont $fontSize={16} $fontColor={data.change === 'RISE' ? theme.colors.activeRed : theme.colors.activeBlue}>
                <ChangeSign src={data.change === 'RISE' ? RiseSign : FallSign} alt={data.change === 'RISE' ? '상승 부호' : '하락 부호'} />
                {numberFormatter(data.signed_change_price)}
              </SemiBoldFont>
            </FlexBox>
          </FlexBox>

          <FlexBox $alignItems={'start'} $gap={'10px'} $flexDirection={'column'}>
            <FlexBox $flexDirection={'column'} $alignItems={'start'}>
              <FlexBox>
                <RowTitle>고가</RowTitle>
                <RowText $fontColor={theme.colors.activeRed}>{numberFormatter(data.high_price)}</RowText>
              </FlexBox>
              <FlexBox>
                <RowTitle>저가</RowTitle>
                <RowText $fontColor={theme.colors.activeBlue}>{numberFormatter(data.low_price)}</RowText>
              </FlexBox>
            </FlexBox>
            <FlexBox $flexDirection={'column'} $alignItems={'start'}>
              <FlexBox $justifyContent={'space-between'}>
                <RowTitle>거래량(24h)</RowTitle>
                <RowText>
                  {numberFormatter(data.acc_trade_volume_24h)} {changeCodeName(data.market)}
                </RowText>
              </FlexBox>
              <FlexBox>
                <RowTitle>거래대금(24H)</RowTitle>
                <RowText>{numberFormatter(data.acc_trade_price_24h)} KRW</RowText>
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </Contents>
      ) : (
        <Contents>
          <FlexBox $flexDirection={'column'} $alignItems={'start'}>
            <FlexBox $gap={'10px'} $margin={'0 0 10px 0'}>
              <Loader $minWidth={140} />
            </FlexBox>

            <FlexBox>
              <Loader $minWidth={220} />
            </FlexBox>

            <FlexBox $gap={'8px'} $margin={'0 0 0 10px'}>
              <Loader $minWidth={60} />
              <Loader $minWidth={120} />
            </FlexBox>
          </FlexBox>

          <FlexBox $alignItems={'start'} $gap={'10px'} $flexDirection={'column'}>
            <FlexBox $flexDirection={'column'} $alignItems={'start'} $gap={'10px'}>
              <FlexBox $gap={'10px'}>
                <Loader $minWidth={50} />
                <Loader $minWidth={80} />
              </FlexBox>
              <FlexBox $gap={'10px'}>
                <Loader $minWidth={50} />
                <Loader $minWidth={80} />
              </FlexBox>
            </FlexBox>
            <FlexBox $flexDirection={'column'} $alignItems={'start'} $gap={'10px'}>
              <FlexBox $gap={'10px'}>
                <Loader $minWidth={50} />
                <Loader $minWidth={120} />
              </FlexBox>
              <FlexBox $gap={'10px'}>
                <Loader $minWidth={50} />
                <Loader $minWidth={120} />
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </Contents>
      )}
    </Wrapper>
  );
};

export default CoinInfoBox;

const Wrapper = styled.div`
  width: 100%;
  max-width: 767px;
  min-height: 124px;
  background: ${theme.colors.ultralightBlueBgColor};
  padding: 12px 16px;
  margin-bottom: 4px;
`;
const Contents = styled.div`
  display: flex;
  justify-content: space-between;
`;
const InfoWrap = styled.div`
  display: flex;
  flex: 1;
`;
const ChangeSign = styled(Image)`
  margin-right: 4px;
  margin-bottom: 1px;
  vertical-align: text-bottom;
`;

const RowTitle = styled(MediumFont)`
  font-size: 14px;
  width: 100%;
  min-width: 100px;
  white-space: nowrap;
  color: ${theme.colors.darkFontColor};
`;
const RowText = styled(MediumFont)`
  font-size: 14px;
  text-align: right;
  white-space: nowrap;
  flex: 1;
  width: 100%;
`;
