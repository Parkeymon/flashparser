const fs = require('fs');
const prompt = require('prompt-sync')();
// log.json

const map = new Map();

const fileName = prompt('Input the file name:');

const data = fs.readFileSync(`./FlashLogs/${fileName}`);

const parsedData = JSON.parse(data);

// console.log(parsedData);

// Sort data by the ClassName
parsedData.forEach((item) => {
    // console.log(item.ClassName.split('.')[0]);
    // Create a new key if it doesn't exist
    if (map !== null && !map.has(item.Class.split('.')[0])) {
        map.set(item.Class.split('.')[0], []);
    }
    // Push the item to the array
    map.get(item.Class.split('.')[0]).push(item);
});

// Print the map
map.forEach((value, key) => {
    console.log("\x1b[31m","\x1b[4m",`${key}`,"\x1b[0m");

    const newMap = new Map();
    value.forEach((item) => {
        // Sort by method name into a new array
        if (newMap !== null && !newMap.has(item.Method)) {
            newMap.set(item.Method, []);
        }
        newMap.get(item.Method).push(item);
    });

    // Print the new map
    newMap.forEach((value, key) => {
        let total = 0;
        let count = 0;

        value.forEach((item) => {
            total += item.Time;
            count++;
        });

        console.log(`Method: ${key} | Average Time: ${total / count}ms | Total Time: ${total}ms | Total Calls: ${count}`);

    });
});
