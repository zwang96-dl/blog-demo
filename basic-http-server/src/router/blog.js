const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleBlogRouter = (req, res) => {
    const { method, url, path, query } = req;
    const id = req.query.id;

    if (method === 'GET' && path === '/api/blog/list') { 
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';

        const result = getList(author, keyword);
        return result.then(listData => new SuccessModel(listData));
    }

    if (method === 'GET' && path === '/api/blog/detail') { 
        const result = getDetail(id);
        return result.then(data => new SuccessModel(data));
    }

    if (method === 'POST' && path === '/api/blog/new') {
        const author = 'zhangsan'; // dummy datq
        req.body.author = author;
        const result = newBlog(req.body);
        return result.then(data => new SuccessModel(data));
    }

    if (method === 'POST' && path === '/api/blog/update') {
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
        const author = 'zhangsan'; // dummy datq
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