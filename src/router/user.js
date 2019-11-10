const handleUserRouter = (req, res) => {
    const { method, url, path } = req;

    if (method === 'POST' && path === '/api/user/login') {
        return {
            msg: 'This is user login API',
        };
    }
};

module.exports = handleUserRouter;