const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleBlogRouter = (req, res) => {
    const { method, url, path, query } = req;
    const id = req.query.id;

    if (method === 'GET' && path === '/api/blog/list') { 
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';

        const listData = getList(author, keyword);
        return new SuccessModel(listData);
    }

    if (method === 'GET' && path === '/api/blog/detail') { 
        const data = getDetail(id);
        return new SuccessModel(data);
    }

    if (method === 'POST' && path === '/api/blog/new') {
        const data = newBlog(req.body);
        return new SuccessModel(data);
    }

    if (method === 'POST' && path === '/api/blog/update') {
        const result = updateBlog(id, req.body);
        if (result) {
            return new SuccessModel();
        }
        return new ErrorModel();
    }

    if (method === 'POST' && path === '/api/blog/del') { 
        const result = delBlog(id);
        if (result) {
            return new SuccessModel();
        }
        return new ErrorModel();
    }
};

module.exports = handleBlogRouter;