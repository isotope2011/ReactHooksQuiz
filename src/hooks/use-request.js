import axios from "axios";
import { useState } from "react";

/*
    useRequest - custom hook
    used to optimized the process of making requests via axios.
    Expects methods, GET, POST, DELETE
    Returns a callback and an state driven errors object
*/

export default ({ body = null, headers = null, method, params = null, url }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    const options = {
      body,
      headers,
      method,
      params,
      url,
    };

    return await axios
      .request(options)
      .then(res => res.data)
      .catch(err => setErrors(err.message));
  };

  return { doRequest, errors };
};
