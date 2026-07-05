import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5001",
});

export const setOrg = (orgId) => {
  api.defaults.headers["x-org-id"] = orgId;
};