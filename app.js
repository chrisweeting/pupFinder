const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const app = express();
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const pups = require("./routes/api/pups");
const User = require('./models/User');
const bodyParser = require('body-parser');

mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ msg: "hello..." });
});

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}));
app.use("/api/users", users );
app.use("/api/pups", pups );

// port var set to port 5000 or PORT in env file
const port = process.env.PORT || 5000;

// app should listen on port and print success message
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});