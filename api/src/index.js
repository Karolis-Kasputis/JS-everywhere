// index.js
// This is the main entry point of our application
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');
const helmet = require('helmet');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const db = require('./db');
require('dotenv').config();
const models = require('./models');
const DB_HOST = process.env.DB_HOST;
const app = express();
app.use(helmet());
app.use(cors());
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const getUser = token => {
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new Error('Session invalid');
    }
  }
};
db.connect(DB_HOST);

app.get('/', (req, res) => {
  res.send('hello world');
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
  context: ({ req }) => {
    console.log('req', req.body);

    const token = req.headers.authorization;
    const user = getUser(token);
    return { models, user };
  }
});
server.applyMiddleware({ app, path: '/api' });

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);
