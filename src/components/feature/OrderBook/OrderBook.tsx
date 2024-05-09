'use client';

import React, { useCallback, useEffect, useState } from 'react';
import theme from '@styles/theme';
import styled from 'styled-components';

import { numberFormatter, formatPercentDecimal, formatToMillion, changeCodeName } from '@utils/formatter';

import { TableBody, TableCell, TableRow, TableText, SymbolImg, ActiveBox } from '@components/feature/Table/table.style';
import { FlexBox, MediumFont, RegularFont } from '@components/styled/StyledComponents';
import { useFetchMarketCode, useWsOrderbook, useWsTicker } from 'use-upbit-api';
import { ImarketCodes, ITicker } from 'use-upbit-api/lib/src/interfaces';

import { marketCode, selectedCode } from '@recoil/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { UpbitWebSocketTicker } from '@type/upbit';

const OrderBook = () => {
  // const { isLoading, marketCodes } = useFetchMarketCode();
  // const [targetMarketCode, setTargetMarketCode] = useState<ImarketCodes[]>([]);
  // const { socket, isConnected, socketData } = useWsTicker(targetMarketCode);
  // const [marketData, setMarketData] = useState<ITicker[]>([]);

  // const [selectedCoin, setSelectedCoin] = useRecoilState(selectedCode);
  const [marketCodeData, setMarketCodeData] = useRecoilState(marketCode); // 마켓 코드 조회
  const [orederData, setOrderData] = useState<any>([]);
  const selectedCoin = useRecoilValue(selectedCode);
  // const { socket, isConnected, socketData } = useWsOrderbook(...selectedCoin);

  // useEffect(() => {
  //   if (!isLoading && marketCodes && socketData) {
  //     const sortedData = [...socketData].sort((a, b) => b.acc_trade_price_24h - a.acc_trade_price_24h);
  //     setMarketData(sortedData);
  //   }
  // }, [isLoading, marketCodes, socketData]);

  // useEffect(() => {
  //   if (!isLoading && marketCodes) {
  //     let tmp = marketCodes.filter((ele) => ele.market.includes('KRW'));
  //     setTargetMarketCode(tmp);
  //     setMarketCodeData(tmp);
  //   }
  // }, [isLoading, marketCodes]);

  // console.log('socketData', socketData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = { method: 'GET', headers: { Accept: 'application/json' } };
        // const response = await fetch(`https://api.upbit.com/v1/orderbook?markets=${selectedCoin}&level=10000`, options);
        const response = await fetch(`https://api.upbit.com/v1/orderbook?markets=${selectedCoin}`, options);

        // const response = await fetch(`https://api.upbit.com/v1/trades/ticks?count=1`, options);
        const result = await response.json();
        setOrderData(result[0]);
        console.log(result);
        // console.log(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [selectedCoin]);

  const timestampTrans = useCallback((timestamp: any) => {
    // if (!timestamp) return;

    const date = new Date(timestamp);
    const formattedDate = `${date.getMonth() + 1}.${date.getDate()} ${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;

    // setFormattedTimestamp(formattedDate);
    return formattedDate;
  }, []);

  return (
    <Wrapper>
      <TableBody>
        {/* {orederData?.map((data, idx) => (
          <TableRow key={idx} $height={32}>
            <TableCell $minWidth={330} $width={33}>
              <TableText $justifyContent={'start'}>{data.bid_size}</TableText>
            </TableCell>
            <TableCell $minWidth={330} $width={33}>
              <TableText $justifyContent={'start'}>{data.bid_price}</TableText>
            </TableCell>
            <TableCell $minWidth={330} $width={33}>
              <TableText $priceChange={data.change}></TableText>
            </TableCell>
          </TableRow>
        ))} */}
      </TableBody>
    </Wrapper>
  );
};

export default OrderBook;

const Wrapper = styled.div``;
