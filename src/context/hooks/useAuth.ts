import { useState, useEffect } from "react";

import api from "../../api";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(true);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (token) {
  //     api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
  //   }

  //   api.get("/").then(() => {
  //     setAuthenticated(true);
  //   });
  // }, []); .

  async function handleLogin(data: any) {
    return api
      .post("/login", data)
      .then((response) => {
        localStorage.setItem(
          "token",
          JSON.stringify(response.data.access_token)
        );

        api.defaults.headers.Authorization = `Bearer ${response.data.access_token}`;
        setAuthenticated(true);

        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = "";
  }

  return { authenticated, handleLogin, handleLogout };
}
