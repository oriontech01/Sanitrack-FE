import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useFetch = (urlParams, method = 'get') => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const access_token = localStorage.getItem('auth-token');
  const fetchMovies = async (url, method) => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: method,
        url: url,
        headers: { Authorization: `Bearer ${access_token}` }
      });
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies(`${BASE_URL}${urlParams}`, method);
  }, [urlParams, method]);

  return { isLoading, data };
};

export default useFetch;
