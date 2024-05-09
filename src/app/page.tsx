'use client';

import axios from 'axios';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import TableHeader from '@components/feature/Table/TableHeader';
import theme from '@styles/theme';
// import { useRecoilState } from 'recoil';
// import { searchCoinData } from '@recoil/atoms';

import { init, dispose } from 'klinecharts';
import RealTimeChart from '@components/feature/Chart/RealTimeChart';
import RealTimePriceTable from '@components/feature/Table/RealTimePriceTable';
import { FlexBox } from '@components/styled/StyledComponents';
import { useRecoilState } from 'recoil';
import { selectedCode } from '@recoil/atoms';
import CoinInfoBox from '@components/feature/CoinInfo/CoinInfoBox';
import OrderBook from '@components/feature/OrderBook/OrderBook';
import SearchBox from '@components/feature/Search/SearchBox';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [selectedCoin, setSelectedCoin] = useRecoilState(selectedCode);
  const [searchCoin, setSearchCoin] = useState('');

  const onChangeSearchInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchCoin(value); // setSearchCoin의 값이 value로 변경되도록 수정합니다.
  }, []);

  const tableHeader = [
    { label: '코인명', minWidth: 160, width: 40, sort: 'market' },
    { label: '현재가', minWidth: 80, width: 20, sort: 'trade_price' },
    { label: '전일대비', minWidth: 80, width: 20, sort: 'signed_change_rate' },
    { label: '거래대금', minWidth: 80, width: 20, sort: 'acc_trade_price_24h' },
  ];

  return (
    <main>
      {/* <input onChange={onChangeSearchInput} /> */}

      <FlexBox $alignItems={'start'} $gap="100px" $justifyContent={'start'}>
        <FlexBox $flexDirection={'column'}>
          <CoinInfoBox />
          <RealTimeChart />
          <OrderBook />
        </FlexBox>
        <FlexBox $flexDirection={'column'}>
          <SearchBox />

          <TableHeader
            headers={tableHeader}
            //  onChangeSortByTradePrice={onChangeSortByTradePrice}
          />
          <RealTimePriceTable headers={tableHeader} />
        </FlexBox>
      </FlexBox>
    </main>
  );
}
