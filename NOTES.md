### Some notes during dev work

1. `brew install nvm` -> multiple nodejs version

2. `node -v`, `npm -v`

3. `nvm list`, `npm install v10.14.1`, `nvm use --delete-prefix 8.12.0`

4. commonjs
- `require('./a.js')`
- `module.exports = func`

5. debugger
- package.js needs to define `main: index.js`
- vscode debugger, same as chrome

6. DNS check, TCP 3 shaking, send http request, get response, TCP 3 wavings

7. Control - handle data

8. Model - define data format

9. setup mysql on dev environment
```
docker run \
    --name blog-demo-mysql \
    -v <YOUR_DIR>/blog_demo_dev_db:/var/lib/mysql \
    -p 3306:3306 \
    -e MYSQL_ROOT_PASSWORD=123456 \
    -d mysql

docker start blog-demo-mysql

mysql -u root --password=123456 -h 127.0.0.1
```

10. Create database and tables
```
CREATE SCHEMA myblog;
SHOW DATABASES;
USE myblog;

CREATE TABLE `myblog`.`users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(20) NOT NULL,
    `password` VARCHAR(20) NOT NULL,
    `realname` VARCHAR(10) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `myblog`.`blogs` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `createtime` BIGINT(20) NOT NULL DEFAULT 0,
    `author` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`id`)
);

SHOW TABLES;
```

11. CRUD
```
INSERT INTO users (username, `password`, realname) VALUES ('zhangsan', '123', 'Zhang San');
INSERT INTO users (username, `password`, realname) VALUES ('lisi', '123', 'Li Si');

SELECT * FROM users;

SET SQL_SAFE_UPDATES=0;
UPDATE users SET realname='Li Si 2' WHERE username='lisi'; // MUST USE WHERE

DELETE FROM users WHERE username='lisi'; // MUST USE WHERE

ALTER TABLE myblog.users ADD COLUMN `state` INT NOT NULL DEFAULT 1 AFTER `realname`;
UPDATE users SET state=0 WHERE username='lisi'; // To replace delete (soft delete)

ALTER TABLE myblog.users DROP COLUMN `state`;

INSERT INTO blogs (title, content, createtime, author) VALUES ('title A', 'content A', 1573379392573, 'zhangsan');

INSERT INTO blogs (title, content, createtime, author) VALUES ('title B', 'content B', 1573379392573, 'lisi');
```

12. 
For "Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server;", try:
```
ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY '123456';
flush privileges;
```

13. `document.cookie` check cookie

14. Update cookie
```
document.cookie = 'k1=100;';
document.cookie = 'k1=200;';
.
.
.
```

15. Server update cookie: `res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly`);`

16. Basic process:
- Send username, password from FE to BE
- BE auth, if true set cookie to frontend
- From now on, every req from FE will be with valid cookie

17. `httpOnly` so only server can change cookie

18. cookie is dangergous

19. cookie saves userid, server can check username

20. Create redis
```
docker run --name blog-demo-redis -p 6379:6379 -v <YOUR_DIR>/blog_demo_dev_cache:/data -d redis

docker start blog-demo-redis # next time

redis-cli
```

21. client can't see -> reverse proxy, nginx

22. Docker install ngxin (Mac has some issues, directly use nginx instead)

23. Access log

24. Customize log

25. Use writeStream (singleton) to write logs

26. Linux crontab split logs

27. * * * * * + cmd 

28. crontab -e # open editor

39. * 0 * * * your_script.sh -> run the script every day at 00:00

40. crontab -l

41. ndoejs -> readline based on stream

42. sql ingestion

43. XSS attack: User upload html snippet, with js script which can get user cookies

44. `alter table `myblog`.`users` change column `password` `password` varchar(32) not null;`

45. `UPDATE users SET password='a9085111aeed613f1896030acaaa2f78' WHERE username='zhangsan';`

46. 