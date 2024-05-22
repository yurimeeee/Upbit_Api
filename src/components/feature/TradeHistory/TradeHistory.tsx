'use client';

import { cloneDeep } from 'lodash';
import { memo, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useWsTrade } from 'use-upbit-api';

import theme from '@styles/theme';
import { IUpbitTradesTicks } from '@type/upbit';
import { selectedCoinState } from '@recoil/atoms';
import TableHeader from '../Table/TableHeader';
import { Loader, TableBody, TableCell, TableRow, TableText } from '@components/feature/Table/table.style';

const timestampToTime = (timestamp: number) => {
  const date = new Date(timestamp);

  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${month}.${day} ${hours}:${minutes}`;
};

function TradeHistory() {
  const selectedCoin = useRecoilValue(selectedCoinState);
  const { socket, isConnected, socketData } = useWsTrade(...selectedCoin);
  const [fetchedData, setFetchedData] = useState<IUpbitTradesTicks[]>([]);
  const preFetchedCount = useRef('30');
  const removedLength = useRef(0);

  // Upbit 체결 내역 fetch 함수
  const options = { method: 'GET', headers: { Accept: 'application/json' } };
  async function fetchTradeHistory(marketCode: string, count: string) {
    try {
      const response = await fetch(`https://api.upbit.com/v1/trades/ticks?market=${marketCode}&count=${count}`, options);
      const result = await response.json();
      setFetchedData(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (selectedCoin) {
      fetchTradeHistory(selectedCoin[0].market, preFetchedCount.current);
      return () => {
        setFetchedData(null as any);
      };
    }
  }, [selectedCoin]);

  useEffect(() => {
    if (socketData && fetchedData) {
      if (socketData.length > 0 && fetchedData.length > 0) {
        const curRemoveLength = socketData.length - removedLength.current;
        setFetchedData((prev) => {
          const data = cloneDeep(prev);
          for (let i = 0; i < curRemoveLength; i++) {
            data.pop();
          }
          return data;
        });
        removedLength.current = removedLength.current + curRemoveLength;
      }
    }
  }, [socketData]);

  const headers = [
    { label: '체결시간', minWidth: 191, width: 25 },
    { label: '체결가격', minWidth: 191, width: 25 },
    { label: '체결량', minWidth: 191, width: 25 },
    { label: '체결금액', minWidth: 191, width: 25 },
  ];

  return (
    <TradeHistoryListWrap>
      <TableHeader headers={headers} />
      <TradeHistoryContainer>
        {socketData ? (
          [...socketData].reverse().map((data, idx) => (
            <TableRow key={idx} $height={32}>
              <TableCell $minWidth={headers[0].minWidth} $width={headers[0].width}>
                <TableText>{timestampToTime(data.trade_timestamp)}</TableText>
              </TableCell>
              <TableCell $minWidth={headers[1].minWidth} $width={headers[1].width}>
                <TableText $priceChange={data.change}>
                  <TradeText $tradeType={data.ask_bid}> {data.trade_price ? data.trade_price.toLocaleString('ko-KR') : null}원</TradeText>
                </TableText>
              </TableCell>
              <TableCell $minWidth={headers[2].minWidth} $width={headers[2].width}>
                <TableText $priceChange={data.change}>
                  <TradeText $tradeType={data.ask_bid}>{data.trade_volume}</TradeText>
                </TableText>
              </TableCell>
              <TableCell $minWidth={headers[3].minWidth} $width={headers[3].width}>
                <TableText>{Math.ceil(data.trade_price * data.trade_volume).toLocaleString('ko-KR')}원</TableText>
              </TableCell>
            </TableRow>
            // ))}
          ))
        ) : (
          <TableBody>
            {[...Array(6)].map((_, idx) => (
              <TableRow key={idx} $height={32}>
                {headers.map((header, i) => (
                  <TableCell key={i} $minWidth={header.minWidth} $width={header.width}>
                    <Loader />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        )}
        {fetchedData
          ? fetchedData.slice(2).map((data, idx) => (
              <TableRow key={idx} $height={32}>
                <TableCell $minWidth={headers[0].minWidth} $width={headers[0].width}>
                  <TableText>{timestampToTime(data.timestamp)}</TableText>
                </TableCell>
                <TableCell $minWidth={headers[1].minWidth} $width={headers[1].width}>
                  <TableText $priceChange={data.ask_bid}>
                    <TradeText $tradeType={data.ask_bid}>{data.trade_price ? data.trade_price.toLocaleString('ko-KR') : null}원</TradeText>
                  </TableText>
                </TableCell>
                <TableCell $minWidth={headers[2].minWidth} $width={headers[2].width}>
                  <TableText $priceChange={data.ask_bid}>
                    <TradeText $tradeType={data.ask_bid}>{data.trade_volume}</TradeText>
                  </TableText>
                </TableCell>
                <TableCell $minWidth={headers[3].minWidth} $width={headers[3].width}>
                  <TableText>{Math.ceil(data.trade_price * data.trade_volume).toLocaleString('ko-KR')}원</TableText>
                </TableCell>
              </TableRow>
            ))
          : null}
      </TradeHistoryContainer>
    </TradeHistoryListWrap>
  );
}

export default memo(TradeHistory);

const TradeHistoryListWrap = styled.div`
  max-width: 767px;
  max-height: 384px;
  margin-top: 408px;

  * {
    font-size: 11px !important;
  }
`;
const TradeHistoryContainer = styled.div`
  width: 100%;
  max-height: 192px;
  overflow-y: scroll;
  background: ${theme.colors.whiteColor};
`;
const TradeText = styled.div<{ $tradeType: string }>`
  color: ${({ $tradeType }) => {
    if ($tradeType === 'ASK') {
      return `${theme.colors.activeBlue} !important`;
    } else {
      return `${theme.colors.activeRed} !important`;
    }
  }};
`;
