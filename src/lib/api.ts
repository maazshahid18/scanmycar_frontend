import axios from "axios";

const api = axios.create({
  baseURL: "https://api.65.2.136.10.nip.io",
});

export default api;