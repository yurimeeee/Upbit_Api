
import { atom, RecoilState, selector, useRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';
import { MarketInfo } from '@type/upbit';

export const textState = atom({
  key: 'textState',
  default: '',
});

export const searchCoinData = atom({
  key: 'searchCoinData',
  default: '',
});

export const selectedCode = atom({
  key: 'selectedCode',
  default: 'KRW-BTC',
});

export const sortByColumn = atom({
  key: 'sortByColumn',
  default: 'acc_trade_price_24h',
});

// export const marketCode = atom({
//   key: 'marketCode',
//   default: [],
// });

export const marketCode: RecoilState<MarketInfo> = atom({
  key: 'marketCode',
  default: {} as MarketInfo,
});

export const isDarkModeAtom = atom({
  key: 'isDarkMode',
  default: false,
});

// const isDark = useRecoilValue(isDarkModeAtom);
// const toggleTheme = () => {
//   isDark ? (localStorage.theme = 'dark') : (localStorage.theme = 'light');
//   setDarkAtom((prev) => !prev);
// };


export const marketCodesState = atom({
  key: "marketCodesState",
  default: [],
});

export const selectedCoinState = atom({
  key: "selectedCoinState",
  default: [
    {
      market: "KRW-BTC",
      korean_name: "비트코인",
      english_name: "Bitcoin",
    },
  ],
});

export const selectedCoinInfoState = atom({
  key: "selectedCoinInfoState",
  default: {},
});



// 마켓 상태
export const marketState = atom({
  key: 'marketState',
  default: {
    loading: false,
    error: null,
    data: null,
  },
});

// 실시간 데이터 상태
export const realtimeDataState = atom({
  key: 'realtimeDataState',
  default: {
    loading: false,
    error: null,
    data: null,
  },
});


export const marketListState = atom({
  key: 'marketListState',
  default: {
    loading: false,
    error: null,
    data: null,
  },
});

export const tickerDataState = atom({
  key: 'tickerDataState',
  default: {
    loading: false,
    error: null,
    data: null,
  },
});



// 마켓 상태 조회 함수
export async function fetchMarket() {
  try {
    const response = await axios.get('https://api.upbit.com/v1/market/all');
    return response.data;
  } catch (error) {
    throw error;
  }
}

// // 실시간 데이터 조회 함수
// export function connectWebsocket(marketList, dispatch) {
//   const ws = new WebSocket('wss://api.upbit.com/websocket/v1');
//   ws.onopen = () => {
//     dispatch({ type: 'GET_REALTIME_DATA' });
//     ws.send(JSON.stringify([{ ticket: 'test' }, { type: 'ticker', codes: marketList }]));
//   };
//   ws.onmessage = async (e) => {
//     const { data } = e;
//     const text = await new Response(data).text();
//     dispatch({ type: 'GET_REALTIME_DATA_SUCCESS', data: JSON.parse(text) });
//   };
//   ws.onerror = (e) => {
//     dispatch({ type: 'GET_REALTIME_DATA_ERROR', error: e });
//   };
// }

// // Recoil Hook 사용 예시
// export function useMarketState() {
//   return useRecoilValue(marketState);
// }

// export function useRealtimeDataState() {
//   return useRecoilValue(realtimeDataState);
// }

// export function useMarketActions() {
//   const [market, setMarket] = useRecoilState(marketState);

//   const getMarket = async (dispatch) => {
//     dispatch({ type: 'GET_MARKET' });
//     try {
//       const data = await fetchMarket();
//       const marketList = data
//         .filter((list) => list.market.includes('KRW-'))
//         .map((list) => list.market);
//       connectWebsocket(marketList, dispatch);
//       dispatch({ type: 'GET_MARKET_SUCCESS', data });
//     } catch (error) {
//       dispatch({ type: 'GET_MARKET_ERROR', error });
//     }
//   };

//   return { market, getMarket };
// }
