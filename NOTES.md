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
    -e MYSQL_ROOT_PASSWORD=<YOUR_ROOT_PASSWORD> \
    -d mysql
```