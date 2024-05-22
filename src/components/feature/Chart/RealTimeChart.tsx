'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { init, dispose, CandleType } from 'klinecharts';
import styled from 'styled-components';
import Image from 'next/image';
import { useRecoilState } from 'recoil';

import theme from '@styles/theme';
import { selectedCode } from '@recoil/atoms';
import { UpbitCandle, UpbitWebSocketTicker } from '@type/upbit';
import { FlexBox } from '@components/styled/StyledComponents';

import ChevronSVG from '@assets/icons/ChevronSVG';
import solid_candle from '@assets/icons/solid_candle.svg';
import stroke_candle from '@assets/icons/stroke_candle.svg';

type Headers = {
  label: string;
  minWidth: number;
  width: number;
};

type RealTimeChartProps = {
  headers?: Headers[];
  onChangeSortByTradePrice?: () => void;
};

const RealTimeChart = ({}: RealTimeChartProps) => {
  const [chartData, setChartData] = useState<UpbitCandle[]>([]);
  const [marketData, setMarketData] = useState<UpbitWebSocketTicker[]>([]);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const [candleType, setCandleType] = useState('candle_solid'); //캔들 타입
  const [timeInterval, setTimeInterval] = useState('minutes'); // 시간봉
  const [selectedCoin, setSelectedCoin] = useRecoilState(selectedCode); // 선택한 코드

  const onChangeSortByTradePrice = useCallback(() => {
    const sortedData = [...marketData].sort((a, b) => b.acc_trade_price_24h - a.acc_trade_price_24h);
    setMarketData(sortedData);
  }, [marketData]);

  const fetchData = async (interval: any) => {
    try {
      const options = { method: 'GET', headers: { Accept: 'application/json' } };
      let url = '';
      switch (interval) {
        case 'days':
          url = `https://api.upbit.com/v1/candles/days?market=${selectedCoin}&to=2024-05-04T09:00:00Z&count=200&convertingPriceUnit=KRW`;
          break;
        case 'weeks':
          url = `https://api.upbit.com/v1/candles/weeks?market=${selectedCoin}&to=2024-05-04T09:00:00Z&count=200&convertingPriceUnit=KRW`;
          break;
        case 'months':
          url = `https://api.upbit.com/v1/candles/months?market=${selectedCoin}&to=2024-05-04T09:00:00Z&count=200&convertingPriceUnit=KRW`;
          break;
        default:
          url = `https://api.upbit.com/v1/candles/minutes/${interval}?market=${selectedCoin}&count=200`;
          break;
      }
      const response = await fetch(url, options);
      const result = await response.json();
      setChartData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // 초기 렌더딩 시, 1분 봉 보기로 설정
  useEffect(() => {
    fetchData(1);
  }, [selectedCoin]);

  // 선택한 시간 봉 설정
  useEffect(() => {
    fetchData(timeInterval);
  }, [timeInterval, selectedCoin]);

  //차트 생성
  useEffect(() => {
    const chart = init('chart');

    //data와 chart 값 매핑
    const mappingFunction = (item: UpbitCandle) => ({
      close: item.trade_price,
      high: item.high_price,
      low: item.low_price,
      open: item.opening_price,
      timestamp: item.timestamp,
      volume: item.candle_acc_trade_volume,
    });

    // 타임스탬프를 기준으로 오름차순 정렬
    const sortByTimestampDesc = (a: UpbitCandle, b: UpbitCandle) => {
      return a.timestamp - b.timestamp;
    };

    // 정렬된 데이터를 차트에 적용
    const sortedData = Array.isArray(chartData) ? chartData.sort(sortByTimestampDesc) : [];

    chart?.applyNewData(sortedData.map(mappingFunction));

    //차트 스타일 커스텀
    chart?.setStyles({
      candle: {
        type: candleType as CandleType,
        bar: {
          upColor: '#2DC08E',
          downColor: '#eb738d',
          noChangeColor: '#888888',
          upBorderColor: '#2DC08E',
          downBorderColor: '#F92855',
          noChangeBorderColor: '#888888',
          upWickColor: '#2DC08E',
          downWickColor: '#F92855',
          noChangeWickColor: '#888888',
        },
        tooltip: {
          custom: [
            { title: '현재 시각 ', value: '{time}' },
            { title: '시작가 ', value: '{open}' },
            { title: '전일 종가 ', value: '{close}' },
            { title: '고가 ', value: '{high}' },
            { title: '저가 ', value: '{low}' },
            { title: '거래량 ', value: '{volume}' },
          ],
        },
      },
    });
    return () => {
      // 차트 제거
      dispose('chart');
    };
  }, [chartData, candleType]);

  const onClickModalOpen = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  return (
    <Wrapper>
      <ChartControler>
        <FlexBox $gap={'16px'}>
          <Button onClick={() => fetchData(1)}>1분</Button>
          <Button onClick={() => fetchData(3)}>3분</Button>
          <Button onClick={() => fetchData(5)}>5분</Button>
          <Button onClick={() => fetchData(10)}>10분</Button>
          <Button onClick={() => fetchData(15)}>15분</Button>
          <Button onClick={() => fetchData(30)}>30분</Button>
          <Button onClick={() => fetchData(60)}>1시간</Button>
          <Button onClick={() => fetchData(240)}>4시간</Button>
          <Button onClick={() => fetchData('days')}>1일</Button>
          <Button onClick={() => fetchData('weeks')}>1주</Button>
          <Button onClick={() => fetchData('months')}>한 달</Button>
          <SelectWrap>
            <Button onClick={onClickModalOpen}>
              <OptionIcon
                src={candleType === 'candle_solid' ? solid_candle : stroke_candle}
                height={20}
                width={20}
                alt={candleType === 'candle_solid' ? '솔리드 캔들 아이콘' : '스트로크 캔들 아이콘'}
              />{' '}
              <ChevronSVG />
            </Button>
            {isSelectOpen && (
              <SelectModal>
                <Option
                  onClick={() => {
                    setCandleType('candle_solid');
                    setIsSelectOpen(false);
                  }}
                >
                  <OptionIcon src={solid_candle} alt="솔리드 캔들 아이콘" height={20} width={20} /> 캔들
                </Option>
                <Option
                  onClick={() => {
                    setCandleType('candle_stroke');
                    setIsSelectOpen(false);
                  }}
                >
                  <OptionIcon src={stroke_candle} alt="스트로크 캔들 아이콘" height={20} width={20} /> 할로우 캔들
                </Option>
              </SelectModal>
            )}
          </SelectWrap>
        </FlexBox>
        <Button onClick={() => fetchData('days')}>초기화</Button>
      </ChartControler>
      <ChartWrapper>
        <div id="chart" style={{ width: 767, height: 400 }} />
      </ChartWrapper>
    </Wrapper>
  );
};

export default RealTimeChart;

const Wrapper = styled.div`
  width: 100%;
  max-width: 767px;
  height: 45px;
  background: ${theme.colors.ultralightBlueBgColor};
`;
const ChartControler = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 16px;
`;
const Button = styled.button`
  font-size: 13px;
  font-weight: 500;
  color: ${theme.colors.darkFontColor};
  background: none;
`;
const SelectWrap = styled.div`
  position: relative;
`;
const SelectModal = styled.div`
  content: '';
  position: absolute;
  display: block;
  background: ${theme.colors.whiteColor};
  width: 160px;
  height: 64px;
  top: 34px;
  z-index: 10;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;
// 'candle_solid'|'candle_stroke'|'candle_up_stroke'|'candle_down_stroke'|'ohlc'|'area'
const ChartWrapper = styled.div`
  margin-top: 4px;
  height: 400px;
  position: relative;
  background: ${theme.colors.whiteColor};
  margin-bottom: 20px;
`;
const Option = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
  height: 32px;
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
const OptionIcon = styled(Image)`
  width: 20px;
  height: 20px;
`;
