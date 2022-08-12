// require env
require("dotenv").config();

// require express
const express = require("express");
const app = express();
const cors = require("cors"); //require cors



// graphql require
const { graphqlHTTP } = require("express-graphql");

// requiring schema
const schema = require("./schema/schema");

// for colors showing on database
const colors = require("colors");

// create dynamic port
const port = process.env.PORT || 5000;

// requiring connection from database
const connectDB = require("./config/db");

// connecting to database
connectDB();

// adding cors
app.use(cors());

// using endpoint for api /graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    // graphiql : process.env.NODE_ENV === "development",
    graphiql: true,
  })
);

// listening to port
app.listen(
  port,
  console.log(
    `listening on port No. http://localhost:${port}/graphql`,
  )
);
