import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(url, body, headers, method) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let response;
      if (method === "GET") {
        response = await axios.get(url);
      } else {
        response = await axios.post(url, body, headers);
      }

      console.log(response.data);
      if (response.data.code === 0) {
        setData(response.data.data);
      }
    };
    fetchData();
  }, []);

  return data;
}

export default useFetch;
