const { exec } = require('../db/mysql');

const login = (username, password) => {
    const sql = `
        SELECT username, realname FROM users WHERE username='${username}' AND password='${password}'
    `;
    return exec(sql).then(rows => rows[0] || {});
};

module.exports = {
    login,
};