const request = require("request");

const fileUpload = (uri, id, formData, catalog, done) => {
  return new Promise( (resolve,reject) => {
    let url = `http://img.com/upload?${uri}&id=${id}&catalog=${catalog}`
    request.post({ url, formData }, (err, httpResponse, body) => {
      if (err) {
        return reject(err);
      }
      if (httpResponse.statusCode === 200) {
        return resolve(body);
      }
      return reject(body);
    })
  })
}

const initializeBoot = (params) => {
  return new Promise( (resolve,reject) => {
    let options = {
      method: 'POST',
      url: `http://img.com/upload`,
      qs: params
    }
    request(options, function (error, response, body) {
      if (error) return reject(error);
      return resolve(body);
    });
  })
}

module.exports = {
  fileUpload,
  initializeBoot
}
