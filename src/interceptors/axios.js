import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.common["Content-Type"] = "application/json";
if (localStorage.getItem("access")) {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("access")}`;
}

let refresh = false;

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    console.log(localStorage.getItem("access"));
    console.log(error);
    if (
      error.response.status === 401 &&
      !refresh &&
      error.request.responseURL.indexOf("auth/login") === -1
    ) {
      refresh = true;

      const response = await axios.post("/auth/token/refresh", {
        refresh: localStorage.getItem("refresh"),
      });

      localStorage.setItem("access", response.data.access);

      if (response.status === 200) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("access")}`;

        return axios(error.config);
      }
    }
    refresh = false;
    return error;
  }
);
