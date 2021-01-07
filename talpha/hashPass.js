const crypto = require('crypto')

const SALT_LEN = 32;
const KEY_LEN = 64;

const SCRYPT_PARAMS = {
  N: 32768,
  r: 8,
  p: 1,
  maxmem: 64 * 1024 * 1024,
};

const serializeHash = (hash, salt, params) => {
  const paramString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`).join(',');
  const saltString = salt.toString('base64').split('=')[0];
  const hashString = hash.toString('base64').split('=')[0];
  return `$scrypt$${paramString}$${saltString}$${hashString}`;
};

const hashPassword = password => new Promise((resolve, reject) => {
  crypto.randomBytes(SALT_LEN, (err, salt) => {
    if (err) {
      reject(err);
      return;
    }
    crypto.scrypt(password, salt, KEY_LEN, SCRYPT_PARAMS, (err, hash) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(serializeHash(hash, salt, SCRYPT_PARAMS));
    });
  });
});

const pass = 'fresco'
const main = async pass => {
  const hash = await hashPassword(pass)
  console.log(hash);
}

main(pass);
