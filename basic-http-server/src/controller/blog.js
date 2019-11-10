const getList = (author, keyword) => {
    return [
        {
            id: 1,
            title: 'title A',
            content: 'content A',
            createTime: 1573373783863,
            author: 'zhwangsan',
        },
        {
            id: 2,
            title: 'title B',
            content: 'content B',
            createTime: 1573373829583,
            author: 'lisi',
        },
    ];
};

const getDetail = (id) => { 
    return {
        id: 1,
        title: 'title A',
        content: 'content A',
        createTime: 1573373783863,
        author: 'zhwangsan',
    };
}

const newBlog = (blogData = {}) => {
    console.log('newBlog', blogData);
    return {
        id: 3,
    };
};

const updateBlog = (id, blogData = {}) => {
    console.log('updateBlog', id, blogData);
    return true;
};

const delBlog = (id) => {
    return true;
};

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog,
};