const fs = require('fs');
const path = require('path');

const fileName = path.resolve(__dirname, 'data.txt');

// read
fs.readFile(fileName, (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data.toString());
});

// write
const content = 'this is content need to be write\n';
const opt = {
    flag: 'a',
};

// check if file exists
fs.writeFile(fileName, content, opt, (err) => {
    if (err) {
        console.error(err);
    }
});

fs.exists(fileName, (exists) => {
    console.log('exist', exists);
});