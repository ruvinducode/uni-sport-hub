const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 5001;

app.get("/", (req, res) => {
  res.send("Uni Sport Hub backend is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});