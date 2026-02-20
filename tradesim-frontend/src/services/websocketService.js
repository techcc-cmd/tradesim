import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class WebSocketService {
  constructor() {
    this.client = null;
    this.connected = false;
    this.subscriptions = new Map();
  }

  connect(onConnect) {
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8083/ws'),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        this.connected = true;
        console.log('WebSocket Connected');
        if (onConnect) onConnect();
      },
      onDisconnect: () => {
        this.connected = false;
        console.log('WebSocket Disconnected');
      },
      onStompError: (frame) => {
        console.error('STOMP error:', frame);
      }
    });

    this.client.activate();
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate();
      this.subscriptions.clear();
    }
  }

  subscribeToMarket(callback) {
    if (!this.client || !this.connected) return;

    const subscription = this.client.subscribe('/topic/market', (message) => {
      const data = JSON.parse(message.body);
      callback(data);
    });

    this.subscriptions.set('market', subscription);
    return subscription;
  }

  subscribeToStock(symbol, callback) {
    if (!this.client || !this.connected) return;

    const subscription = this.client.subscribe(`/topic/market/${symbol}`, (message) => {
      const data = JSON.parse(message.body);
      callback(data);
    });

    this.subscriptions.set(`stock-${symbol}`, subscription);
    return subscription;
  }

  subscribeToPortfolio(userId, callback) {
    if (!this.client || !this.connected) return;

    const subscription = this.client.subscribe(`/topic/portfolio/${userId}`, (message) => {
      const data = JSON.parse(message.body);
      callback(data);
    });

    this.subscriptions.set('portfolio', subscription);
    return subscription;
  }

  subscribeToOrders(userId, callback) {
    if (!this.client || !this.connected) return;

    const subscription = this.client.subscribe(`/topic/orders/${userId}`, (message) => {
      const data = JSON.parse(message.body);
      callback(data);
    });

    this.subscriptions.set('orders', subscription);
    return subscription;
  }

  subscribeToLeaderboard(callback) {
    if (!this.client || !this.connected) return;

    const subscription = this.client.subscribe('/topic/leaderboard', (message) => {
      const data = JSON.parse(message.body);
      callback(data);
    });

    this.subscriptions.set('leaderboard', subscription);
    return subscription;
  }

  unsubscribe(key) {
    const subscription = this.subscriptions.get(key);
    if (subscription) {
      subscription.unsubscribe();
      this.subscriptions.delete(key);
    }
  }
}

export default new WebSocketService();
