import axios from 'axios';

const fetchService = {
  request(query) {
    return new Promise((resolve, reject) => {
      axios(query)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }
};

export default fetchService;
