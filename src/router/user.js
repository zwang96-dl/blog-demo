const { loginCheck } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleUserRouter = (req, res) => {
    const { method, url, path, query } = req;

    if (method === 'POST' && path === '/api/user/login') {
        const { username, password } = req.body;

        const result = loginCheck(username, password);

        if (result) { 
            return new SuccessModel();
        }

        return new ErrorModel();
    }
};

module.exports = handleUserRouter;