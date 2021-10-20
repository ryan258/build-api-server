const url = require("url");

const express = require("express");
const router = express.Router();
const needle = require("needle"); // needle returns a promise
const apicache = require("apicache");

// environment variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

// Init cache
const cache = apicache.middleware;

router.get("/", cache("2 minutes"), async (req, res, next) => {
  try {
    // console.log(url.parse(req.url, true).query);

    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query,
    });

    const apiRes = await needle("get", `${API_BASE_URL}?${params}`);
    const data = apiRes.body;

    // LOG THE REQUEST FOR DEVELOPMENT PURPOSES
    if (process.env.NODE_ENV !== "production") {
      console.log(`REQUEST: ${API_BASE_URL}?${params}`);
    }

    res.status(200).json(data);
  } catch (error) {
    // console.log(error);
    // res.status(500).json({ error: error.message });
    next(error);
  }
});

module.exports = router;
