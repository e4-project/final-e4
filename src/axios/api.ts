import axios from 'axios';
export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-cache",
  }
})