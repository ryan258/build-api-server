const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

// Rate limiting
const limiter = rateLimit({
  // 5 requests per 10 minutes max
  windowMs: 10 * 60 * 1000, // 10 minutes
  // max amount of requests in 10 minutes
  max: 50,
});
app.use(limiter);
// and since we're using this as a proxy
app.set("trust proxy", 1);

// Set statis folder
app.use(express.static("public"));

// Routes
app.use("/api", require("./routes"));

// Enable CORS
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
