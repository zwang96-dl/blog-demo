const handleBlogRouter = (req, res) => {
    const { method, url, path } = req;

    if (method === 'GET' && path === '/api/blog/list') { 
        return {
            msg: 'This is blog list API',
        };
    }

    if (method === 'POST' && path === '/api/blog/detail') { 
        return {
            msg: 'This is new blog API',
        };
    }

    if (method === 'POST' && path === '/api/blog/update') {
        return {
            msg: 'This is update blog API',
        };
    }

    if (method === 'POST' && path === '/api/blog/del') { 
        return {
            msg: 'This is delete blog API',
        };
    }
};

module.exports = handleBlogRouter;