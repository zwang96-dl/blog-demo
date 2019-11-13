const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const loginCheck = req => {
    if (!req.session.username) {
        return Promise.resolve(new ErrorModel('Not login yet'));
    }
};

const handleBlogRouter = (req, res) => {
    const { method, url, path, query } = req;
    const id = req.query.id;

    if (method === 'GET' && path === '/api/blog/list') { 
        let author = req.query.author || '';
        const keyword = req.query.keyword || '';

        if (req.query.isadmin) {
            const loginCheckResult = loginCheck(req);
            if (loginCheckResult) {
                return loginCheckResult;
            }
            author = req.session.username;
        }

        const result = getList(author, keyword);
        return result.then(listData => new SuccessModel(listData));
    }

    if (method === 'GET' && path === '/api/blog/detail') { 
        const result = getDetail(id);
        return result.then(data => new SuccessModel(data));
    }

    if (method === 'POST' && path === '/api/blog/new') {
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            return loginCheckResult;
        }

        const author = req.session.username;
        req.body.author = author;
        const result = newBlog(req.body);
        return result.then(data => new SuccessModel(data));
    }

    if (method === 'POST' && path === '/api/blog/update') {
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            return loginCheckResult;
        }

        const result = updateBlog(id, req.body);
        return result.then(val => {
            if (val) {
                return new SuccessModel();
            } else {
                return new ErrorModel('Update blog failed!');
            }
        });
    }

    if (method === 'POST' && path === '/api/blog/del') {
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            return loginCheckResult;
        }

        const author = req.session.username;
        const result = delBlog(id, author);
        return result.then(val => {
            if (val) {
                return new SuccessModel();
            } else {
                return new ErrorModel('Delete blog failed!');
            }
        })
    }
};

module.exports = handleBlogRouter;