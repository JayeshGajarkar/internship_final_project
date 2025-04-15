import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private websocket!: WebSocket;
  private messages: Subject<any> = new Subject();
  private connectionStatus: Subject<boolean> = new Subject();
  private reconnectInterval = 5000; // 5 seconds
  private isConnected = false;

  connect(userId: string) {
    if (this.isConnected) return; // Prevent multiple connections

    this.websocket = new WebSocket(`ws://localhost:8080?userId=${userId}`);
    this.isConnected = true;

    this.websocket.onopen = () => {
      this.connectionStatus.next(true);
    };

    this.websocket.onmessage = (event) => {
      this.messages.next(JSON.parse(event.data));
    };

    this.websocket.onerror = (error) => {
      console.error(`WebSocket error for user ${userId}:`, error);
    };

    this.websocket.onclose = () => {
      this.connectionStatus.next(false);
      this.isConnected = false;
      setTimeout(() => this.connect(userId), this.reconnectInterval); // Attempt to reconnect
    };
  }

  closeConnection(userId: string) {
    if (this.websocket) {
      this.websocket.close();
      this.isConnected = false;
    }
  }

  sendMessage(message: any) {
    if (this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(JSON.stringify(message));
    }
  }

  getMessages(): Observable<any> {
    return this.messages.asObservable();
  }

  getConnectionStatus(): Observable<boolean> {
    return this.connectionStatus.asObservable();
  }
}
