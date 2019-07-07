const mongoose = require('mongoose');
const config = require('config');

module.exports = async () => {
  const host         = config.get('database.host');
  const port         = config.get('database.port');
  const authRequired = config.get('database.authRequired');

  const authObj = {};
  if (authRequired) {
    authObj.user = config.get('database.user');
    authObj.pass = config.get('database.password');
  }
  const database = config.get('database.database');
  const dbAddress = `mongodb://${host}:${port}/${database}`

  return new Promise((resolve, reject) => {
    let counter = 0;

    const tryConnect = async () => {
      try {
        const result = await mongoose.connect(dbAddress, authObj); 
        resolve();
      } catch (e) {
        counter += 1;
        console.log(`DB Connection failed ${counter} times`);
        if (counter > 5) {
          reject(new Error('DB Connection failed after retries'));
        }
        setTimeout(tryConnect, 5000);
      }
    }
    tryConnect();
  });
}