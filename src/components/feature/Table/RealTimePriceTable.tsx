'use client';

import React, { useEffect, useState } from 'react';
import theme from '@styles/theme';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { useFetchMarketCode, useWsTicker } from 'use-upbit-api';
import { ImarketCodes, ITicker } from 'use-upbit-api/lib/src/interfaces';

import { marketCode, selectedCode, selectedCoinState, sortByColumn } from '@recoil/atoms';
import { numberFormatter, formatPercentDecimal, formatToMillion, changeCodeName } from '@utils/formatter';
import { FlexBox, MediumFont, RegularFont } from '@components/styled/StyledComponents';
import { TableBody, TableCell, TableRow, TableText, SymbolImg, Loader, Favorite } from '@components/feature/Table/table.style';

import FavoriteFilledIcon from '@assets/icons/favorite_filled.svg';
import FavoriteIcon from '@assets/icons/favorite.svg';

export type HeaderType = {
  label: string;
  minWidth?: number;
  width: number;
};

type TableRowProps = {
  headers: HeaderType[];
  isEnglish: boolean;
  isChangePrice: boolean;
};

const RealTimePriceTable = ({ headers = [], isEnglish, isChangePrice }: TableRowProps) => {
  const { isLoading, marketCodes } = useFetchMarketCode();
  const [targetMarketCode, setTargetMarketCode] = useState<ImarketCodes[]>([]);
  const { socket, isConnected, socketData } = useWsTicker(targetMarketCode);
  const [marketData, setMarketData] = useState<ITicker[]>([]);

  const [selectedCoin, setSelectedCoin] = useRecoilState(selectedCode);
  const [selectedCoinData, setSelectedCoinData] = useRecoilState(selectedCoinState);
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

  useEffect(() => {
    if (!isLoading && marketCodes) {
      let tmp = marketCodes.filter((ele) => ele.market.includes('KRW'));
      setTargetMarketCode(tmp);
      setMarketCodeData(tmp as any);
    }
  }, [isLoading, marketCodes]);

  const handleFavoriteClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>, codeMarket: string) => {
    event.stopPropagation(); // 부모 컴포넌트의 onClick 이벤트 방지

    // 로컬 스토리지에서 MyFavorite를 가져옴
    const myFavorite = JSON.parse(localStorage.getItem('MyFavorite') || '[]');

    // 이미 MyFavorite에 있는지 확인
    const index = myFavorite.indexOf(codeMarket);
    if (index !== -1) {
      // MyFavorite에서 해당 값을 삭제
      myFavorite.splice(index, 1);
    } else {
      // MyFavorite에 추가
      myFavorite.push(codeMarket);
    }

    // MyFavorite를 로컬 스토리지 업데이트
    localStorage.setItem('MyFavorite', JSON.stringify(myFavorite));
  };

  return (
    <Wrapper>
      {!isLoading && marketData.length > 1 ? (
        <TableBody>
          {marketData?.map((data, idx) => (
            <TableRow
              key={idx}
              onClick={() => {
                setSelectedCoin(data.code);
                setSelectedCoinData(marketCodes.filter((code) => code.market === data.code));
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
                  {!isEnglish ? marketCodes.filter((code) => code.market === data.code)[0].korean_name : marketCodes.filter((code) => code.market === data.code)[0].english_name}
                  <RegularFont $fontColor={theme.colors.lightGrayFontColor} $fontSize={11} $margin={'2px 0 0 10px'}>
                    {changeCodeName(data.code)}
                  </RegularFont>
                </TableText>
              </TableCell>
              <TableCell $minWidth={headers[1].minWidth} $width={headers[1].width}>
                <TableText $justifyContent={'end'} $priceChange={data.change}>
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
                    {isChangePrice && (
                      <RegularFont $fontSize={11} $margin={'0 4px 0 0'}>
                        {numberFormatter(data.signed_change_price)}
                      </RegularFont>
                    )}
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
  max-width: 400px;
  overflow-y: scroll;
  background: ${theme.colors.whiteColor};
`;
