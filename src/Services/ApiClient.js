import axios from "axios";

export const apiClient = axios.create({
  /**
   * Import the config from the App/Config/index.js file
   * http://localhost:5000
   */
  baseURL: "/api/v1/",
  method: "get",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  timeout: 3000
});
export default apiClient;
