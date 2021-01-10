import { ApolloServer } from 'apollo-server-micro'
import typeDefs from './schemas'
import resolvers from './resolvers'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: (/* { req } */) => {
    // Note! This example uses the `req` object to access headers,
    // but the arguments received by `context` vary by integration.
    // This means they will vary for Express, Koa, Lambda, etc.!
    //
    // To find out the correct arguments for a specific integration,
    // see the `context` option in the API reference for `apollo-server`:
    // https://www.apollographql.com/docs/apollo-server/api/apollo-server/
    // Get the user token from the headers.
    // const token = req.headers.Authentication || '';
    // console.log('token', req.Authentication);
    // const coisas = { coisas: 1337 };
    // throw new AuthenticationError('you must be logged in');
    /**
     * TODO
     *
     * Return authentication user
     */
    // return { coisas };
  }
})

const handler = apolloServer.createHandler({ path: '/api/graphql' })

export const config = {
  api: {
    bodyParser: false
  }
}

export default handler
