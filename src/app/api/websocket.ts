// utils/websocket.ts
export type MessageType = 'ticker' | 'trade' | 'orderbook';

interface WebSocketMessage {
  type: MessageType;
  codes: string[];
}

const createWebSocket = (onMessage: (event: MessageEvent) => void): WebSocket => {
  const socket = new WebSocket('wss://api.upbit.com/websocket/v1');

  socket.onopen = () => {
    console.log('WebSocket connection established');
    const subscribeMessage: WebSocketMessage[] = [
      { type: 'ticker', codes: ['KRW-BTC'] },
      { type: 'trade', codes: ['KRW-BTC'] },
      { type: 'orderbook', codes: ['KRW-BTC'] },
    ];
    socket.send(JSON.stringify(subscribeMessage));
  };

  socket.onmessage = onMessage;

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };

  return socket;
};

export default createWebSocket;
