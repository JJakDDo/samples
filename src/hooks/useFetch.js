import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(url, body, headers) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(url, body, headers);

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
