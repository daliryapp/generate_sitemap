const express = require("express");
const app = express()
const port = 8081;
const {generateSitemap} = require("./utils.js");
const axios = require('axios');


app.get('/', async (req, res) => {
    const response = await axios.get('https://fetchfromurl.com');

    const data = response.data;
    const arrRes = data.filter((item) => item.extra_CountryCode === "AR");

    const generateResult = await generateSitemap(arrRes);
    res.send({length: arrRes.length, isGenerated: generateResult, data: arrRes});
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})