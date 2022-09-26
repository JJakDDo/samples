import { useEffect, useCallback } from "react";
import { useStore } from "../store/store";
import axios from "axios";

function GetRefreshToken() {
  const jwt = useStore((state) => state.jwt);
  const setJwt = useStore((state) => state.setJwt);
  const adminLoggedIn = useStore((state) => state.adminLoggedIn);

  const getRefreshToken = useCallback(async () => {
    try {
      const url = adminLoggedIn
        ? "https://tessverso.io/api/admin/refresh"
        : "https://tessverso.io/api/refresh";
      const data = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `${jwt.token_type} ${jwt.access_token}`,
          },
        }
      );

      if (data.data.code === 0) {
        const { access_token, token_type } = data.data.data;
        console.log(data.data.data);
        setJwt(access_token, token_type);
      }
    } catch (error) {
      console.log(error);
    }
  }, [adminLoggedIn, jwt]);

  useEffect(() => {
    let intervalId;
    if (jwt.access_token) {
      intervalId = setInterval(() => {
        getRefreshToken();
      }, 3300000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [jwt.access_token, getRefreshToken]);

  return <></>;
}

export default GetRefreshToken;
