const { exec, escape } = require('../db/mysql');
const { genPassword } = require('../utils/crypto');

const login = (username, password) => {
    username = escape(username);
    password = escape(password);
    const sql = `
        SELECT username, realname FROM users WHERE username=${username} AND password='${genPassword(password)}';
    `;
    console.log('sql', sql)
    return exec(sql).then(rows => rows[0] || {});
};

module.exports = {
    login,
};