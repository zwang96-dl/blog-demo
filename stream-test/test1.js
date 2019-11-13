// process.stdin.pipe(process.stdout);

// const http = require('http');
// const server = http.createServer((req, res) => {
//     req.pipe(res);
// });

// server.listen(8000);

// const readStream = fs.createReadStream(fileName1);
// const writeStream = fs.createWriteStream(fileName1);
// readStream.pipe(writeStream);
// readStream.on('end', function () {
//     console.log('copy ends!');
// });

// const fs = require('fs');
// const path = require('path');

// const fileName1 = path.resolve(__dirname, 'data.txt');
// const fileName2 = path.resolve(__dirname, 'data-copy.txt');

// const readStream = fs.createReadStream(fileName1);
// const writeStream = fs.createWriteStream(fileName2);

// readStream.pipe(writeStream);

// readStream.on('data', chunk => {
//     console.log('now read: ', chunk.toString());
// });

// readStream.on('end', () => {
//     console.log('copy done!');
// });


