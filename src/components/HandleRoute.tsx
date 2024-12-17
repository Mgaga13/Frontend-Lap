"use client";
import React, { useEffect } from "react";

import { jwtDecode } from "jwt-decode";
import { useStore } from "../store";
import { useRefreshToken } from "../services/react-query/query/user";
import { useNavigate } from "react-router-dom";

const HandleRoute = ({ children }: { children: React.ReactNode }) => {
  const { UserSlice, AuthSlice } = useStore();
  const route = useNavigate();
  const { mutate: refreshToken } = useRefreshToken();

  useEffect(() => {
    const data = localStorage.getItem("data");
    if (!data) {
      console.log("no data");
      UserSlice.setIsLoggedIn(false);
      // set token to null
      AuthSlice.setAccessToken(null);
      AuthSlice.setRefreshToken(null);
    } else {
      const { access_token, refresh_token, user_id } = JSON.parse(data);
      console.log(access_token);
      let decodedToken = jwtDecode(access_token);
      let currentDate = new Date();
      const isRemember = localStorage.getItem("rememberPassword") === "true";
      // JWT exp is in seconds

      if (decodedToken && decodedToken.exp) {
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          if (isRemember) {
            console.log("call refresh token", isRemember);
            // Refresh token
            refreshToken({
              refresh_token: refresh_token,
              access_token: access_token,
            });
          } else {
            console.log("token is expired and don't remember password");
            localStorage.removeItem("data");
            UserSlice.setIsLoggedIn(false);
            // set token to null
            AuthSlice.setAccessToken(null);
            AuthSlice.setRefreshToken(null);
            route("/");
          }
        } else {
          console.log("token is still valid");
          UserSlice.setIsLoggedIn(true);
          AuthSlice.setAccessToken(access_token);
          AuthSlice.setRefreshToken(refresh_token);
        }
      }
    }
  }, []);

  return <>{children}</>;
};

export default HandleRoute;
