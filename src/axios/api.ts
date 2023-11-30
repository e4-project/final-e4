import axios from "axios";
console.log("msg", process.env.BASE_URL ?? " http://localhost:3000/api");
export const api = axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost:3000/api',
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-cache",
  },
});
