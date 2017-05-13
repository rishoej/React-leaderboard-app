const fetchData = (api) => {
  return fetch(api)
    .then(response => {
      return response.json();;
    })
    .catch(error => {
      throw error;
    })
};

export default fetchData;
