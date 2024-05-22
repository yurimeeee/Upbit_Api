'use client';

import { useState } from 'react';
import TableHeader from '@components/feature/Table/TableHeader';

import RealTimeChart from '@components/feature/Chart/RealTimeChart';
import RealTimePriceTable from '@components/feature/Table/RealTimePriceTable';
import { FlexBox } from '@components/styled/StyledComponents';
import CoinInfoBox from '@components/feature/CoinInfo/CoinInfoBox';
import OrderBook from '@components/feature/OrderBook/OrderBook';
import SearchBox from '@components/feature/Search/SearchBox';
import TradeHistory from '@components/feature/TradeHistory/TradeHistory';

export default function Home() {
  const [isEnglish, setIsEnglish] = useState(false); // 마켓 명 영문으로 표기
  const [isChangePrice, setIsChangePriceh] = useState(true); // 전일 대비 등락 가격 표시

  const tableHeader = [
    { label: '코인명', minWidth: 160, width: 40, sort: 'market' },
    { label: '현재가', minWidth: 80, width: 20, sort: 'trade_price' },
    { label: '전일대비', minWidth: 80, width: 20, sort: 'signed_change_rate' },
    { label: '거래대금', minWidth: 80, width: 20, sort: 'acc_trade_price_24h' },
  ];

  return (
    <main>
      <FlexBox $alignItems={'start'} $gap="10px" $justifyContent={'start'} $margin="20px 0 0">
        <OrderBook />
        <FlexBox $flexDirection={'column'}>
          <CoinInfoBox />
          <RealTimeChart />
          <TradeHistory />
        </FlexBox>
        <FlexBox $flexDirection={'column'} $maxWidth="400px">
          <SearchBox isEnglish={isEnglish} isChangePrice={isChangePrice} setIsEnglish={setIsEnglish} setIsChangePriceh={setIsChangePriceh} />

          <TableHeader headers={tableHeader} />
          <RealTimePriceTable headers={tableHeader} isEnglish={isEnglish} isChangePrice={isChangePrice} />
        </FlexBox>
      </FlexBox>
    </main>
  );
}
