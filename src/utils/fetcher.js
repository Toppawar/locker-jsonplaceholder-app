/**
 * Fetches the data from the API
 *
 * @param  {String}  url The URL to be fetched.
 * @param  {String} method The method to be used.
 * @param {Object} body The body to be sent in case of Post.
 * @param {Object} headers Custom Headers to be sent.
 * @return {Promise} The promise that resolves with the data.
 */

const fetcher = ({ url, method = "GET", body = null, headers }) => {
  return fetch(`${BACKEND_URL}${url}`, {
    method,
    body,
    headers: {
      "Content-Type": "application/json charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      ...headers,
    },
  })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      }
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    })
    .then((response) => {
      return Promise.resolve(response.json());
    });
};

export default fetcher;
