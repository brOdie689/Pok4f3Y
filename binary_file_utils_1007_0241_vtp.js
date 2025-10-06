// 代码生成时间: 2025-10-07 02:41:19
const fs = require('fs');

/**
 * Reads a binary file and returns its contents as a Buffer.
 * @param {string} filePath - The path to the binary file.
 * @returns {Buffer} The contents of the binary file.
 */
function readBinaryFile(filePath) {
  try {
    // Read the file as a buffer
    const data = fs.readFileSync(filePath);
    return data;
  } catch (error) {
    // Handle errors (e.g., file not found, permission issues)
    console.error(`Error reading file: ${error.message}`);
    throw error;
  }
}

/**
 * Writes a buffer to a binary file.
 * @param {string} filePath - The path to the binary file.
 * @param {Buffer} buffer - The buffer to write to the file.
 * @returns {void}
 */
function writeBinaryFile(filePath, buffer) {
  try {
    // Write the buffer to the file
    fs.writeFileSync(filePath, buffer);
  } catch (error) {
    // Handle errors (e.g., file not found, permission issues)
    console.error(`Error writing file: ${error.message}`);
    throw error;
  }
}

// Example usage:

// Read a binary file
const filePath = 'example.bin';
const fileContent = readBinaryFile(filePath);

// Write a buffer to a binary file
const bufferToWrite = Buffer.from('Hello, world!');
writeBinaryFile('output.bin', bufferToWrite);
