import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

interface Message {
  id: number;
  text: string;
  sender: string;
}

wss.on('connection', (ws:any) => {
  console.log('Client connected');

  ws.on('message', (data:any) => {
    const message: Message = JSON.parse(data.toString());
    console.log('Received:', message);

    // Broadcast the message to all connected clients
    wss.clients.forEach((client:any) => {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');