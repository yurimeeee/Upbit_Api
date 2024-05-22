import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import WebSocket from 'ws';

const API_KEY = 'tgdvTI1e76Va3xG4cgNpa2OEes5tsx9Zetrotx39';
// const API_KEY = '9cMbYJLRBAVerBBN4x2g5k3YMeXJ2Fy2my7WqCqO';
// export function createWebSocket() {
//   const payload = {
//     access_key: 'tgdvTI1e76Va3xG4cgNpa2OEes5tsx9Zetrotx39',
//     nonce: uuidv4(),
//   };

//   // const jwtToken = jwt.sign(payload, 'tgdvTI1e76Va3xG4cgNpa2OEes5tsx9Zetrotx39');

//   // const ws = new WebSocket('wss://api.upbit.com/websocket/v1', {
//   //   headers: {
//   //     authorization: `Bearer ${jwtToken}`,
//   //   },
//   // });

//   // ws.on('open', () => {
//   //   console.log('connected!');
//   //   // 연결 후 요청
//   //   ws.send('[{"ticket":"test example"},{"type":"myTrade"}]');
//   // });

//   // ws.on('error', console.error);

//   // ws.on('message', (data: any) => console.log(data.toString()));

//   // ws.on('close', () => console.log('closed!'));

//   // return ws;
// }

const connectWebSocket = () => {
  // const payload = { data: 'someData' }; // Adjust your payload as needed
  // const secretKey = 'tgdvTI1e76Va3xG4cgNpa2OEes5tsx9Zetrotx39';
  // // Log to check the values
  // console.log('jwt:', jwt);
  // console.log('payload:', payload);
  // try {
  //   const jwtToken = jwt.sign(payload, secretKey);
  //   const ws = new WebSocket('wss://api.upbit.com/websocket/v1', {
  //     headers: {
  //       Authorization: `Bearer ${jwtToken}`,
  //     },
  //   });
  //   ws.onopen = () => {
  //     console.log('WebSocket is open now.');
  //   };
  //   ws.onmessage = (event) => {
  //     console.log('WebSocket message received:', event);
  //   };
  //   ws.onclose = () => {
  //     console.log('WebSocket is closed now.');
  //   };
  // } catch (error) {
  //   console.error('Error creating JWT token:', error);
  // }
};

export default connectWebSocket;

// const createWebSocket = (): WebSocket => {
//   const payload = {
//     access_key: 'tgdvTI1e76Va3xG4cgNpa2OEes5tsx9Zetrotx39',
//     nonce: uuidv4(),
//   };

//   const jwtToken = jwt.sign(payload, 'tgdvTI1e76Va3xG4cgNpa2OEes5tsx9Zetrotx39');

//   const ws = new WebSocket('wss://api.upbit.com/websocket/v1', {
//     headers: {
//       Authorization: `Bearer ${jwtToken}`,
//     },
//   });

//   ws.on('open', () => {
//     console.log('connected!');
//     // Request after connection
//     ws.send('[{"ticket":"test example"},{"type":"myTrade"}]');
//   });

//   ws.on('error', console.error);

//   ws.on('message', (data) => {
//     console.log(data.toString());
//   });

//   ws.on('close', () => {
//     console.log('closed!');
//   });

//   return ws;
// };

// export default createWebSocket;

// const createWebSocket = (): WebSocket => {
//   const payload = {
//     access_key: API_KEY,
//     nonce: uuidv4(),
//   };

//   const jwtToken = jwt.sign(payload, API_KEY);

//   const ws = new WebSocket('wss://api.upbit.com/websocket/v1', {
//     headers: {
//       authorization: `Bearer ${jwtToken}`,
//     },
//   });

//   ws.on('open', () => {
//     console.log('connected!');
//     // Request after connection
//     ws.send('[{"ticket":"test example"},{"type":"myTrade"}]');
//     // { type: 'orderbook', codes: ['KRW-BTC'] },
//   });

//   ws.on('error', console.error);

//   ws.on('message', (data) => {
//     console.log(data.toString());
//   });

//   ws.on('close', () => {
//     console.log('closed!');
//   });

//   return ws;
// };

// export default createWebSocket;
