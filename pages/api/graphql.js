import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from './schemas';
import { resolvers } from './resolvers';

const apolloServer = new ApolloServer({typeDefs, resolvers});

const handler = apolloServer.createHandler({ path: '/api/graphql' });

export const config = {
    api: {
        bodyParser: false
    }
};

export default handler;