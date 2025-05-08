import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { readFile } from 'fs/promises';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers.js';
import path from 'path';
import { fileURLToPath } from 'url';

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
