import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { gql } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import fs from 'fs';
import path from 'path';
import resolvers from './resolvers.js';


const app = express();


const schemaPath = path.resolve('./schema.graphql');
const schemaFile = fs.readFileSync(schemaPath, 'utf8');
const typeDefs = gql(schemaFile);


const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

// Apollo Server setup
const server = new ApolloServer({
    schema,
});
  
await server.start();
server.applyMiddleware({ app });



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
