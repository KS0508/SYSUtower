const { net, app } = require('electron').remote; // eslint-disable-line import/no-extraneous-dependencies

const ST_HOST = 'localhost';
let ST_PORT = 0;

export default function install(Vue) {
  Vue.prototype.$request = { // eslint-disable-line no-param-reassign
    init(port) {
      ST_PORT = port;
    },
    async api(method, url) {
      return new Promise((resolve, reject) => {
        const request = net.request({
          method,
          protocol: 'http:',
          hostname: ST_HOST,
          port: ST_PORT,
          path: url,
        });

        let resData = '';

        request.on('response', (res) => {
          res.on('end', () => {
            let resJSON;
            try {
              resJSON = JSON.parse(resData);
            } catch (err) {
              reject(err);
            }

            if (resJSON.ret !== 0) {
              reject(resJSON.data);
            } else {
              resolve(resJSON.data);
            }
          });
          res.on('data', (chunk) => {
            resData = `${resData}${chunk}`;
          });
        });
        request.on('error', (err) => {
          reject(err);
        });

        request.end();
      });
    },
  };
}
