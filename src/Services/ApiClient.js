import axios from "axios";

export const apiClient = axios.create({
  /**
   * Import the config from the App/Config/index.js file
   */
  baseURL: "http://localhost:8080/api/v1/",
  method: "get",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  timeout: 3000
});
export default apiClient;
