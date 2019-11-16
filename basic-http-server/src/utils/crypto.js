const crypto = require('crypto');

const SECRET_KEY = 'adwksajdasdsadms2@dsada=)DWDSAD';

const md5 = content => {
    let md5String = crypto.createHash('md5');
    return md5String.update(content).digest('hex');
};

const genPassword = password => {
    const str = `passowr=${password}&key=${SECRET_KEY}`;
    return md5(str);
}

console.log(genPassword(123))

module.exports = {
    genPassword,
};
