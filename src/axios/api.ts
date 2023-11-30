import axios from "axios";
console.log("env_status: ", process.env.NODE_ENV);
export const api = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-cache",
  },
});
