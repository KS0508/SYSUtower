const { net } = require('electron').remote; // eslint-disable-line import/no-extraneous-dependencies

// const ST_HOST = '172.18.40.173';
// const ST_PORT = 5000;
const ST_HOST = 'localhost';
const ST_PORT = '8000';

export default function install(Vue) {
  Vue.prototype.$request = { // eslint-disable-line no-param-reassign
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
              reject(retJSON.data);
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
