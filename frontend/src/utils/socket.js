import { io } from 'socket.io-client';
export const socket = io(process.env.NODE_ENV === 'production' 
  ? window.location.origin 
  : 'http://localhost:5000'
);
