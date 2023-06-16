import { useState, useEffect } from "react";

import api from "../../services/api";

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }

    api
      .get(`/user/${localStorage.getItem("username")?.replaceAll(`"`, "")}`)
      .then((response) => {
        setUser(response.data);
      });
  }, []);

  async function handleLogin(data: any) {
    return api
      .post("/login", data)
      .then((response) => {
        localStorage.setItem(
          "token",
          JSON.stringify(response.data.access_token)
        );
        localStorage.setItem(
          "username",
          JSON.stringify(response.data.user.username)
        );

        api.defaults.headers.Authorization = `Bearer ${response?.data?.access_token}`;
        setUser(response?.data?.user);

        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    api.defaults.headers.Authorization = "";
  }

  return { user, handleLogin, handleLogout };
}
