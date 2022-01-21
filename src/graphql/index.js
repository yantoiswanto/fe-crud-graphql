import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.BE_CRUD_GRAPHQL || 'http://localhost:4001',
  cache: new InMemoryCache(),
});

export default client;
export { default as books } from './books';
