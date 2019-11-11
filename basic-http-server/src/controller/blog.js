const { exec } = require('../db/mysql');

const getList = (author, keyword) => {

    let sql = `SELECT * FROM blogs WHERE 1=1 `;
    if (author) { 
        sql += `AND author='${author}' `;
    }
    if (keyword) { 
        sql += `AND title like '%${keyword}' `;
    }
    sql += `ORDER BY createtime desc;`;
    return exec(sql);
};

const getDetail = (id) => { 

    const sql = `SELECT * FROM blogs WHERE id='${id}'`;
    return exec(sql).then(rows => rows[0]);
}

const newBlog = (blogData = {}) => {
    const { title, content, author } = blogData;
    const createTime = Date.now();

    const sql = `
        INSERT INTO blogs (title, content, createtime, author)
        VALUES ('${title}', '${content}', ${createTime}, '${author}');
    `;

    return exec(sql).then(insertData => {
        console.log('insertData', insertData);
        return {
            id: insertData.insertId,
        };
    });
};

const updateBlog = (id, blogData = {}) => {

    const { title, content } = blogData;
    const sql = `
        UPDATE blogs SET title='${title}', content='${content}'
        WHERE id=${id};
    `;

    return exec(sql).then(updateData => {
        console.log('insertData', updateData);
        if (updateData.affectedRows > 0) {
            return true;
        }
        return false;
    });
};

const delBlog = (id, author) => {
    const sql = `DELETE FROM blogs WHERE id='${id}' AND author='${author}'`;
    return exec(sql).then(
        deleteData => {
            console.log('deleteData', deleteData);
            if (deleteData.affectedRows > 0) {
                return true;
            }
            return false;
        }
    );
};

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog,
};