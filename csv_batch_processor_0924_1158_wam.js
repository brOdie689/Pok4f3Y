// 代码生成时间: 2025-09-24 11:58:02
// csv_batch_processor.js - A Node.js script to process CSV files in batch

const fs = require('fs').promises;
const { parse } = require('csv-parse');
const { transform } = require('stream-transform');
const readline = require('readline');

// Function to read a CSV file and process its content
async function processCSVFile(filePath) {
  // Read the CSV file
  const fileStream = fs.createReadStream(filePath);

  // Create a transform stream to modify the CSV data
  const transformStream = transform((record, callback) => {
    // Process each record (e.g., modify, validate, or enrich)
    // For demonstration, we'll just uppercase the first field
    record[0] = record[0].toUpperCase();
    callback(null, record);
  }, { parallel: 10 });

  // Parse the CSV data
  const parser = parse({
    columns: true,
    skip_empty_lines: true,
  });

  // Create a writable stream to the output file
  const outputPath = filePath.replace('.csv', '_processed.csv');
  const outputStream = fs.createWriteStream(outputPath);

  // Pipe the streams together
  fileStream
    .pipe(parser)
    .pipe(transformStream)
    .pipe(outputStream)
    .on('finish', () => {
      console.log(`Processed file saved to ${outputPath}`);
    })
    .on('error', (err) => {
      console.error(`Error processing file ${filePath}: ${err.message}`);
    });
}

// Function to process multiple CSV files in a directory
async function processCSVFilesInDirectory(directoryPath) {
  try {
    // Read the directory contents
    const files = await fs.readdir(directoryPath);

    // Filter CSV files
    const csvFiles = files.filter(file => file.endsWith('.csv'));

    // Process each CSV file
    await Promise.all(csvFiles.map(file => processCSVFile(`${directoryPath}/${file}`)));

    console.log('All CSV files have been processed.');
  } catch (err) {
    console.error(`Error reading directory ${directoryPath}: ${err.message}`);
  }
}

// Example usage:
// processCSVFilesInDirectory('./csv_files/').catch(console.error);
