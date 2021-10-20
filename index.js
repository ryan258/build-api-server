const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

// Routes
app.use("/api", require("./routes"));

// Enable CORS
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
