const express = require('express');
const app = express();

// app listens for get request on "/"
app.get("/", (req, res) => {
  res.send("hello world?");
});

// port var set to port 5000 or PORT in env file
const port = process.env.PORT || 5000;

// app should listen on port and print success message
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});