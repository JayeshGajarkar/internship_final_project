import { WebSocketServer, WebSocket } from 'ws';
import { IncomingMessage } from 'http';
import { TaskServices } from './services/taskServices';

const clients: Map<string, WebSocket> = new Map();
const wss = new WebSocketServer({ port: 8080 });

async function getUserIdsByTaskId(taskId:number){
  const userIds=await TaskServices.getUserIdsByTaskId(taskId);
  return Array.from(new Set(userIds));
}

 export function websocketServer() {
    wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
        const userId = new URL(req.url!, `http://${req.headers.host}`).searchParams.get('userId');
        if (userId) {
            clients.set(userId, ws);
        }

        ws.on('message', async (message: string) => {
            const { text, taskId } = JSON.parse(message);
            const userIds=await getUserIdsByTaskId(taskId);
            clients.forEach((client, id) => {
                if(userIds.includes(Number(id))){
                    client.send(JSON.stringify({ text,taskId }));
                }
            });
        });

        ws.on('close', () => {
            if (userId) {
                clients.delete(userId);
            }
        });

        ws.on('error', (error) => {
            console.error(`WebSocket error:`, error);
        });
    });

    console.log('WebSocket server is running on ws://localhost:8080');
}
