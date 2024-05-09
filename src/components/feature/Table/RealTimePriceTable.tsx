'use client';

import React, { useEffect, useState } from 'react';
import theme from '@styles/theme';
import styled from 'styled-components';

import { numberFormatter, formatPercentDecimal, formatToMillion, changeCodeName } from '@utils/formatter';

import { TableBody, TableCell, TableRow, TableText, SymbolImg, Loader, Favorite } from '@components/feature/Table/table.style';
import { FlexBox, MediumFont, RegularFont } from '@components/styled/StyledComponents';
import { useFetchMarketCode, useWsTicker } from 'use-upbit-api';
import { ImarketCodes, ITicker } from 'use-upbit-api/lib/src/interfaces';
import { marketCode, selectedCode, sortByColumn } from '@recoil/atoms';
import { useRecoilState } from 'recoil';
import { UpbitWebSocketTicker } from '@type/types';
import FavoriteFilledIcon from '@assets/icons/favorite_filled.svg';
import FavoriteIcon from '@assets/icons/favorite.svg';

export type HeaderType = {
  label: string;
  minWidth?: number;
  width: number;
};

type TableRowProps = {
  headers: HeaderType[];
  onChangeSortByTradePrice?: () => void;
};

const RealTimePriceTable = ({ headers = [], onChangeSortByTradePrice }: TableRowProps) => {
  const { isLoading, marketCodes } = useFetchMarketCode();
  const [targetMarketCode, setTargetMarketCode] = useState<ImarketCodes[]>([]);
  const { socket, isConnected, socketData } = useWsTicker(targetMarketCode);
  const [marketData, setMarketData] = useState<ITicker[]>([]);

  const [selectedCoin, setSelectedCoin] = useRecoilState(selectedCode);
  const [marketCodeData, setMarketCodeData] = useRecoilState(marketCode); // 마켓 코드 조회
  const [sortBy, setSortBy] = useRecoilState(sortByColumn); // 마켓 코드 조회

  useEffect(() => {
    if (!isLoading && marketCodes && socketData) {
      if (sortBy === 'acc_trade_price_24h') {
        const sortedData = [...socketData].sort((a, b) => b.acc_trade_price_24h - a.acc_trade_price_24h);
        setMarketData(sortedData);
      }
      if (sortBy === 'signed_change_rate') {
        const sortedData = [...socketData].sort((a, b) => b.signed_change_rate - a.signed_change_rate);
        setMarketData(sortedData);
      }
      if (sortBy === 'trade_price') {
        const sortedData = [...socketData].sort((a, b) => b.trade_price - a.trade_price);
        setMarketData(sortedData);
      }
    }
  }, [isLoading, marketCodes, socketData, sortBy]);

  // if (label === 'Header 1') {
  //   sortedData = sortedData.sort((a, b) => a.acc_trade_price_24h - b.acc_trade_price_24h);
  // } else if (label === 'Header 2') {
  //   sortedData = sortedData.sort((a, b) => a.some_other_value - b.some_other_value);
  // } else if (label === 'Header 3') {
  //   sortedData = sortedData.sort((a, b) => a.another_value - b.another_value);
  // }

  // console.log('테이블서 선택된 코드 네임', searchCoin);
  // useEffect(() => {
  //   if (!isLoading && marketCodes && socketData && marketData) {
  //     const sortedData = [...socketData].sort((a, b) => b.acc_trade_price_24h - a.acc_trade_price_24h);
  //     const updatedData = sortedData.map((item) => ({
  //       ...item,
  //       isPriceChanged: marketData.some((data) => data.code === item.code && data.trade_price !== item.trade_price),
  //     }));
  //     setMarketData(updatedData);
  //   }
  // }, [isLoading, marketCodes, socketData, marketData]);

  // console.log(marketCodes);
  // console.log(socketData);

  useEffect(() => {
    if (!isLoading && marketCodes) {
      let tmp = marketCodes.filter((ele) => ele.market.includes('KRW'));
      setTargetMarketCode(tmp);
      setMarketCodeData(tmp);
    }
  }, [isLoading, marketCodes]);
  // console.log(mar);

  const handleFavoriteClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>, codeMarket: string) => {
    event.stopPropagation(); // 부모 컴포넌트의 onClick 이벤트가 발생하는 것을 방지합니다.

    // 로컬 스토리지에서 MyFavorite를 가져옵니다. 없으면 빈 배열을 사용합니다.
    const myFavorite = JSON.parse(localStorage.getItem('MyFavorite') || '[]');

    // // 이미 MyFavorite에 있는지 확인합니다.
    // if (!myFavorite.includes(codeMarket)) {
    //   // MyFavorite에 추가합니다.
    //   myFavorite.push(codeMarket);

    //   // 업데이트된 MyFavorite를 로컬 스토리지에 저장합니다.
    //   localStorage.setItem('MyFavorite', JSON.stringify(myFavorite));

    //   // 필요에 따라 추가된 코인을 상태로 업데이트하거나 다른 작업을 수행합니다.
    // }

    // 이미 MyFavorite에 있는지 확인합니다.
    const index = myFavorite.indexOf(codeMarket);
    if (index !== -1) {
      // MyFavorite에서 해당 값을 삭제합니다.
      myFavorite.splice(index, 1);
    } else {
      // MyFavorite에 추가합니다.
      myFavorite.push(codeMarket);
    }

    // 업데이트된 MyFavorite를 로컬 스토리지에 저장합니다.
    localStorage.setItem('MyFavorite', JSON.stringify(myFavorite));
  };
  // console.log(localStorage.getItem('MyFavorite'));
  return (
    <Wrapper>
      {!isLoading && marketData.length > 1 ? (
        <TableBody>
          {marketData?.map((data, idx) => (
            <TableRow
              key={idx}
              onClick={() => {
                setSelectedCoin(data.code);
              }}
            >
              <TableCell $minWidth={headers[0].minWidth} $width={headers[0].width}>
                <TableText $justifyContent={'start'}>
                  <Favorite
                    src={localStorage.getItem('MyFavorite')?.includes(data.code) ? FavoriteFilledIcon : FavoriteIcon}
                    alt={'즐겨찾기'}
                    onClick={(event) => handleFavoriteClick(event, data.code)}
                  />
                  <SymbolImg src={`https://static.upbit.com/logos/${changeCodeName(data.code)}.png`} />
                  {marketCodes.filter((code) => code.market === data.code)[0].korean_name}
                  <RegularFont $fontColor={theme.colors.lightGrayFontColor} $fontSize={11} $margin={'2px 0 0 10px'}>
                    {changeCodeName(data.code)}
                  </RegularFont>
                </TableText>
              </TableCell>
              <TableCell $minWidth={headers[1].minWidth} $width={headers[1].width}>
                <TableText $justifyContent={'end'} $priceChange={data.change} className={data.isPriceChanged ? 'price-changed' : ''}>
                  <MediumFont $fontSize={13}>{numberFormatter(data.trade_price)}</MediumFont>
                </TableText>
              </TableCell>
              <TableCell $minWidth={headers[2].minWidth} $width={headers[2].width}>
                <TableText $priceChange={data.change}>
                  <FlexBox $flexDirection={'column'} $justifyContent={'end'} $alignItems={'end'}>
                    <RegularFont $fontSize={12} $margin={'0 4px 0 0'}>
                      {data.change === 'RISE' && '+'}
                      {formatPercentDecimal(data.signed_change_rate)}%
                    </RegularFont>
                    <RegularFont $fontSize={11} $margin={'0 4px 0 0'}>
                      {numberFormatter(data.signed_change_price)}
                    </RegularFont>
                  </FlexBox>
                </TableText>
              </TableCell>
              <TableCell $minWidth={headers[3].minWidth} $width={headers[3].width}>
                <TableText>
                  {formatToMillion(data.acc_trade_price_24h)}{' '}
                  <RegularFont $fontColor={theme.colors.lightGrayFontColor} $fontSize={12} $margin={'0 0 0 2px'}>
                    백만
                  </RegularFont>
                </TableText>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <TableBody>
          {[...Array(16)].map((_, index) => (
            <TableRow key={index}>
              {headers.map((header, i) => (
                <TableCell key={i} $minWidth={header.minWidth} $width={header.width}>
                  <Loader />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      )}
    </Wrapper>
  );
};

export default RealTimePriceTable;

const Wrapper = styled.div`
  min-height: 720px;
  max-height: 720px;
  overflow-y: scroll;
  background: ${theme.colors.whiteColor};
`;
