import axios from "axios";
/*
    useRequest - custom hook
    used to optimized the process of making requests via axios.
    Expects methods, GET, POST, DELETE
    Returns a callback and an state driven errors object
*/

export default (options) => {
  const doRequest = async () => {
    return await axios
      .request(options)
      .then(({ data }) => ({ data }))
      .catch(error => ({ error }));
  };

  return doRequest;
};
