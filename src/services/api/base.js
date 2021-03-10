import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://d9u7x85vp9.execute-api.us-east-2.amazonaws.com/production",
});

apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // handling edge case of network error
    if (error.message === "Network Error") {
      return Promise.reject("Network Error");
    } else {
      return Promise.reject(error.response);
    }
  },
);

const { get, post, put, delete: destroy } = apiClient;

export { get, post, put, destroy };
