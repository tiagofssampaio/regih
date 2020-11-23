import { ApolloServer } from 'apollo-server-micro';
import schema from './schema';
import context from './context';

const apolloServer = new ApolloServer({schema, context});

export const config = {
    api: {
        bodyParser: false
    }
};

export default apolloServer.createHandler({ path: '/api/graphql' });