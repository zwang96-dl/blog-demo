const querystring = require('querystring');

const handleBlogRouter = require('./src/router/blog');
const { handleUserRouter, getCookieExpires } = require('./src/router/user');


// session data
const SESSION_DATA = {};

const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        if (req.method !== 'POST') { 
            resolve({});
            return;
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({});
            return;
        }

        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString();
        });
        req.on('end', chunk => {
            if (!postData) {
                resolve({});
                return
            }
            resolve(JSON.parse(postData));
        });
    });
};

const serverHandle = (req, res) => {
    res.setHeader('content-type', 'application/json');
    const url = req.url;
    req.path = url.split('?')[0];
    req.query = querystring.parse(url.split('?')[1]);

    // parse cookie
    req.cookie = {};
    const cookieStr = req.headers.cookie || '';
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return;
        }

        const [key, val] = item.split('=');
        req.cookie[key.trim()] = val.trim();
    });

    // parse session
    let needSetCookie = false;
    let userId = req.cookie.userid;
    if (userId) {
        if (!SESSION_DATA[userId]) { // undefined
            SESSION_DATA[userId] = {};
        }
    } else {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`;
        SESSION_DATA[userId] = {};
    }
    req.session = SESSION_DATA[userId];


    getPostData(req).then(postData => {
        req.body = postData;

        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            blogResult.then(blogData => {
                res.end(
                    JSON.stringify(blogData),
                )
            }); 
            return;
        }

        const userResult = handleUserRouter(req, res);
        if (userResult) {
            userResult.then(userData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; expires=${getCookieExpires()}`);
                }
                res.end(JSON.stringify(userData));
            });
            return;
        }

        res.writeHead(404, { 'content-type': 'test/plain' });
        res.write('Sorry 404 Not Found\n');
        res.end();
    });
};

module.exports = serverHandle;