import { memo, MutableRefObject, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useWsOrderbook } from 'use-upbit-api';
import { selectedCoinState, selectedCoinInfoState } from '@recoil/atoms';
import theme from '@styles/theme';
import { IUpbitOrderbook } from '@type/types';
import Loader from '@components/share/Loader';

const OrderBookContatiner = styled.div`
  grid-row: span 2;
  background-color: white;
  height: 100%;
  min-height: 815px;
  max-height: 815px;
  min-width: 254px;
  overflow: overlay;
  overflow-y: scroll;
`;

const AskContainer = styled.div`
  background-color: white;
`;

const AskBidSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr;
`;

const AskSection = styled(AskBidSection)`
  background-color: #e8f4ff;
`;
const BidContainer = styled.div`
  background-color: white;
`;

const BidSection = styled(AskBidSection)`
  background-color: #fff4f4;
`;

const OrderBox = styled.div`
  height: 30px;
  border: 0.5px solid ${theme.colors.whiteColor};
`;

const BlankBox = styled(OrderBox)`
  background-color: white;
`;

const OrderPriceBox = styled(OrderBox)<{ $changeType?: string }>`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 11px;
  color: ${({ $changeType }) => {
    switch ($changeType) {
      case 'RISE':
        return '#EF1C1C';
      case 'EVEN':
        return '#000000';
      case 'FALL':
        return '#1261C4';
      default:
        return '#000000';
    }
  }}!important;
`;
const OrderSizeBox = styled(OrderBox)`
  font-size: 9px;
  min-width: 84px;
`;

const AskOrderSizeBox = styled(OrderSizeBox)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const BidOrderSizeBox = styled(OrderSizeBox)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

// const SizeBarBox = styled.div.attrs(({ width }) => {
//   return {
//     style: {
//       width: width,
//     },
//   };
// })`
//   height: 70%;
//   justify-content: ${(props) => (props.type === 'right' ? 'flex-end' : 'flex-start')};
//   display: flex;
//   align-items: center;
// `;
const SizeBarBox = styled.div<{ $type?: string; $width?: string }>`
  display: flex;
  align-items: center;
  width: ${({ $width }) => $width};
  height: 70%;
  justify-content: ${({ $type }) => {
    if ($type === 'right') {
      return 'flex-end';
    } else {
      return 'flex-start';
    }
  }};
`;

const AskSizeBarBox = styled(SizeBarBox)`
  background-color: #c2e1ff;
  div {
    padding-right: 5px;
  }
`;
const BidSizeBarBox = styled(SizeBarBox)`
  background-color: #ffdfdf;
  div {
    padding-left: 5px;
  }
`;

const getChangeRate = (currentValue: number, prevClose: number) => {
  const result = (((currentValue - prevClose) / prevClose) * 100).toFixed(2);
  return result;
};

const getChangeType = (currentValue: number, prevClose: number) => {
  const change = currentValue - prevClose;
  if (change > 0) {
    return 'RISE';
  } else if (change === 0) {
    return 'EVEN';
  } else if (change < 0) {
    return 'FALL';
  } else {
    return 'EVEN';
  }
};

const getMaxSize = (orderbook: any) => {
  const askSizes = [] as number[];
  const bidSizes = [] as number[];
  orderbook.map((unit: any) => {
    askSizes.push(unit.ask_size);
    bidSizes.push(unit.bid_size);
  });

  const maxAskSize = Math.max(...askSizes);
  const maxBidSize = Math.max(...bidSizes);

  return [maxAskSize, maxBidSize];
};

function OrderBook() {
  const selectedCoin = useRecoilValue(selectedCoinState);
  const selectedCoinInfo = useRecoilValue(selectedCoinInfoState);
  const webSocketOptions = { throttle_time: 400, max_length_queue: 100 };
  const { socket, isConnected, socketData } = useWsOrderbook(...selectedCoin);
  const [askMaxSize, setAskMaxSize] = useState();
  const [bidMaxSize, setBidMaxSize] = useState();
  const [scrollOn, setScrollOn] = useState(false);
  // const orderBookRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    if (socketData) {
      const orderbook = socketData.orderbook_units;
      const [maxAskSize, maxBidSize] = getMaxSize(orderbook);
      setAskMaxSize(maxAskSize as any);
      setBidMaxSize(maxBidSize as any);
      // if (!scrollOn) {
      //   orderBookRef.current.scrollTop = orderBookRef.current.scrollHeight / 3;
      // }
    }
  }, [socketData]);

  return (
    <OrderBookContatiner
    // ref={orderBookRef}
    >
      {socketData && selectedCoinInfo ? (
        <>
          <AskContainer>
            {[...socketData.orderbook_units].reverse().map((data, idx) => (
              <AskSection key={idx}>
                <AskOrderSizeBox>
                  <AskSizeBarBox $type={'right'} $width={`${(data.ask_size / askMaxSize) * 100}%`}>
                    <div>{data.ask_size}</div>
                  </AskSizeBarBox>
                </AskOrderSizeBox>
                <OrderPriceBox $changeType={getChangeType(data.ask_price, selectedCoinInfo.prev_closing_price)}>
                  <div>{data.ask_price.toLocaleString('ko-KR')}</div>
                  {/* <div>
                    {getChangeRate(data.ask_price, selectedCoinInfo.prev_closing_price) > 0 ? '+' : null}
                    {getChangeRate(data.ask_price, selectedCoinInfo.prev_closing_price)}%
                  </div> */}
                </OrderPriceBox>
                <BlankBox></BlankBox>
              </AskSection>
            ))}
          </AskContainer>
          <BidContainer>
            {socketData.orderbook_units.map((data, idx) => (
              <BidSection key={idx}>
                <BlankBox></BlankBox>
                <OrderPriceBox $changeType={getChangeType(data.bid_price, selectedCoinInfo.prev_closing_price)}>
                  <div>{data.bid_price.toLocaleString('ko-KR')}</div>
                  {/* <div>
                    {getChangeRate(data.bid_price, selectedCoinInfo.prev_closing_price) > 0 ? '+' : null}
                    {getChangeRate(data.bid_price, selectedCoinInfo.prev_closing_price)}%
                  </div> */}
                </OrderPriceBox>
                <BidOrderSizeBox>
                  <BidSizeBarBox $type={'left'} $width={`${(data.bid_size / bidMaxSize) * 100}%`}>
                    <div>{data.bid_size}</div>
                  </BidSizeBarBox>
                </BidOrderSizeBox>
              </BidSection>
            ))}
          </BidContainer>
        </>
      ) : (
        <Loader />
      )}
    </OrderBookContatiner>
  );
}

export default memo(OrderBook);
