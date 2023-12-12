// utils/getURL.ts
const IS_SERVER = typeof window === "undefined";
const IS_ENV_DEV = process.env.NODE_ENV === "development";
export const getBaseUrl = (path: string) => {
  const baseURL = IS_SERVER
    ? IS_ENV_DEV
      ? process.env.BASE_URL_DEV
      : process.env.BASE_URL || "http://127.0.0.1:3000"
    : window.location.origin;
  return new URL(path, baseURL).toString();
};
