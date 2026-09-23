const fs = require('fs');
const path = require('path');

// We will construct the entire dataset with all 4 diseases from the user's legacy files.
// Let's create the raw text files for each disease to process cleanly.
console.log("Starting data extraction...");
