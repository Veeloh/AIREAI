
const fs = require('fs')

let newData = "\nThis is some additional text."

fs.appendFile('./logs/messagelogs.txt', newData, (err) => {

    if (err) throw err;
})