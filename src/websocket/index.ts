import WebSocket, { Server } from 'ws';
import { Request } from 'express';
import { userIdToken } from '../util/users';

/**
 * Parse message of WebSocket.
 * @param {string} message - the raw message from WebSocket.
 */
const parseMessage = (message: string) => {
  try {
    return JSON.parse(message);
  } catch (error) {
    return message.toString();
  }
};

/**
 * Sends a WebSocket notification to specific clients.
 * @param {Object} payload - The payload to send as a WebSocket notification.
 * @param {String} type - The type of notification to send.
 * @param {String|String[]} targetUserId - A string or an array of user IDs to send the notification to.
 */
export const sendTargetedNotification = (type: string, payload: any, targetUserId: string | string[]) => {
  websocketServer.clients.forEach((client: any) => {
    if (Array.isArray(targetUserId) ? targetUserId.includes(client.userId) : targetUserId === client.userId) {
      client.send(JSON.stringify({ type, payload }));
    }
  });
};

/**
 * Sends a WebSocket notification to all connected clients.
 * @param {Object} payload - The payload to send as a WebSocket notification.
 * @param {String} type - The type of notification to send.
 */
export const sendGeneralNotification = (type: string, payload: any) => {
  websocketServer.clients.forEach((client: any) => {
    client.send(JSON.stringify({ type, payload }));
  });
};

// Initialize the WebSocket server
export const websocketServer = new Server({ noServer: true });

export const setupWebSocket = (server: any) => {
  server.on('upgrade', (request: any, socket: any, head: any) => {
    websocketServer.handleUpgrade(request, socket, head, (ws) => {
      websocketServer.emit('connection', ws, request);
    });
  });

  websocketServer.on('connection', (ws: WebSocket, request: Request) => {
    const userToken = request.query.userToken as string;
    if (userToken) {
      const userId = userIdToken(userToken);
      (ws as any).userId = userId;
    }

    ws.on('close', () => {
      console.log('*****************************  Web Socket - close *****************************');
    });

    ws.on('message', (message: WebSocket.Data) => {
      console.log('Web Socket - message', parseMessage(message.toString()));
    });
  });
};
