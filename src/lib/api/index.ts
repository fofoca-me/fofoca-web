/* eslint-disable @typescript-eslint/no-unsafe-call */
import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
