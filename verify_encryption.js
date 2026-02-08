
const fs = require('fs');
const path = require('path');
// const { JSDOM } = require("jsdom"); // Not usually installed in this env


// Polyfills
global.atob = (str) => Buffer.from(str, 'base64').toString('binary');
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;


// Load the script
const scriptPath = path.join(__dirname, 'script.js');
const scriptContent = fs.readFileSync(scriptPath, 'utf8');

// We need to validly execute the script to see if studentsData is populated correctly.
// However, the script has DOM content loaded listeners and other things.
// We can try to eval the specific part of the script that defines the data.

// Let's extract the encryption/decryption part and run it.
// It relies on 'script.js' being in the same directory.
// Actually, `script.js` is designed for the browser. 

// I will extract the relevant lines from script.js and run them here to verify.
// The key is to check if `studentsData` variable ends up having the correct structure.

// Read the file and isolate the part we changed.
// We can regex for the const encryptedStudentsData and the function and the const studentsData.

const startMarker = 'const encryptedStudentsData';
const endMarker = '/***********************'; // The next section header

const startIndex = scriptContent.indexOf(startMarker);
const endIndex = scriptContent.indexOf(endMarker, startIndex);

if (startIndex === -1 || endIndex === -1) {
    console.error("Could not find the code block in script.js");
    process.exit(1);
}

const codeBlock = scriptContent.substring(startIndex, endIndex);

// Execute the code block
eval(codeBlock);

// Check if studentsData is correct
if (typeof studentsData === 'object' && studentsData.cs1 && studentsData.cs1['1'] === 'ABDUL MUTHAYEEB') {
    console.log("VERIFICATION SUCCESS: studentsData key '1' in 'cs1' is 'ABDUL MUTHAYEEB'");
    console.log("Keys in cs1:", Object.keys(studentsData.cs1).length);
} else {
    console.error("VERIFICATION FAILED: studentsData is not correct.");
    console.log("Type of studentsData:", typeof studentsData);
    console.log("studentsData content:", JSON.stringify(studentsData, null, 2));
}
