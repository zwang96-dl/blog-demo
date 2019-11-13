const { login } = require('../controller/user');
const { setCache } = require('../db/redis');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const getCookieExpires = () => { 
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    return d.toGMTString();
};

const handleUserRouter = (req, res) => {
    const { method, url, path, query } = req;

    // login
    if (method === 'POST' && path === '/api/user/login') {
        const { username, password } = req.body;

        const result = login(username, password);
        return result.then(data => {
            if (data.username) {
                req.session.username = data.username;
                req.session.realname = data.realname;
                setCache(req.sessionId, req.session);
                return new SuccessModel();
            }
            return new ErrorModel('Login failed');
        });
    }

    // login test
    // if (method === 'GET' && req.path === '/api/user/login-test') { 
    //     if (req.session.username) {
    //         return Promise.resolve(new SuccessModel({
    //             session: req.session,
    //         }));
    //     }
    //     return Promise.resolve(new ErrorModel('Not Login'));
    // }
};

module.exports = {
    handleUserRouter,
    getCookieExpires,
};