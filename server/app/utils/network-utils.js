const axios = require('axios');

function getPage(url) {
  return axios.get(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:81.0) Gecko/20100101 Firefox/81.0'
    }
  }).then(function (response) {
    return response.data;
  }).catch(function (err) {
    console.log('err in getPage()', err);
    return null;
  });
}

module.exports = {
  getPage
};
