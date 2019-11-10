const fs = require('fs');
const path = require('path');

// Callback method
// function getFileContent(fileName, callback) {
//     const fullFileName = path.resolve(__dirname, 'files', fileName);
//     fs.readFile(fullFileName, (err, data) => {
//         if (err) {
//             console.error(err);
//             return;
//         }
//         callback(JSON.parse(data.toString()));
//     });
// }

// callback hell
// getFileContent('a.json', aData => {
//     console.log('a data', aData);
//     getFileContent(aData.next, bData => {
//         console.log('b data', bData);
//         getFileContent(bData.next, cData => {
//             console.log('c data', cData);
//         })
//     })
// });


// Promise -> capsulate callback
function getFileContent(fileName) { 
    return new Promise((resolve, reject) => {
        const fullFileName = path.resolve(__dirname, 'files', fileName);
        fs.readFile(fullFileName, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data.toString()));
        });
    });
}

getFileContent('a.json')
    .then((data) => {
        console.log('in a data promise resolve');
        console.log(data);
        return getFileContent(data.next)
    })
    .then((data) => {
        console.log('in b data promise resolve');
        console.log(data);
        return getFileContent(data.next)
    })
    .then((data) => {
        console.log('in c data promise resolve');
        console.log(data);
        return getFileContent(data.next)
    });


// async/await