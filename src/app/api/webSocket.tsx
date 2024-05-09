import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import WebSocket from 'ws';

// const API_KEY = 'tgdvTI1e76Va3xG4cgNpa2OEes5tsx9Zetrotx39';
// const API_KEY = '9cMbYJLRBAVerBBN4x2g5k3YMeXJ2Fy2my7WqCqO';
export function createWebSocket() {
  const payload = {
    access_key: 'tgdvTI1e76Va3xG4cgNpa2OEes5tsx9Zetrotx39',
    nonce: uuidv4(),
  };

  // const jwtToken = jwt.sign(payload, 'tgdvTI1e76Va3xG4cgNpa2OEes5tsx9Zetrotx39');

  // const ws = new WebSocket('wss://api.upbit.com/websocket/v1', {
  //   headers: {
  //     authorization: `Bearer ${jwtToken}`,
  //   },
  // });

  // ws.on('open', () => {
  //   console.log('connected!');
  //   // 연결 후 요청
  //   ws.send('[{"ticket":"test example"},{"type":"myTrade"}]');
  // });

  // ws.on('error', console.error);

  // ws.on('message', (data: any) => console.log(data.toString()));

  // ws.on('close', () => console.log('closed!'));

  // return ws;
}
