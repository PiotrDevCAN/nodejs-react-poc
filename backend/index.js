const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

// Sample GraphQL Schema
const schema = buildSchema(`
  type Query {
    message: String
    externalData: [String]
  }
`);

// Root resolver for GraphQL
const root = {
  message: () => 'Hello from GraphQL!',
  externalData: async () => {
    // Example REST API call
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data.map(post => post.title);
  }
};

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

// Start the server
app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
