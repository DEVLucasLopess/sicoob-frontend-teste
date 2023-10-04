import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const useHttp = () => {
  const get = async (url) => {
    return await api.get(url);
  };

  return { get };
};