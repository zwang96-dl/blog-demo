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
```