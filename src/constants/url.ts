export const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.BASE_URL
    : "http://localhost:3000";
