const db = require('../../../lib/db')
const escape = require('sql-template-strings')

export const resolvers = {
    Query: {
        getClients: async () => {
            return await db.query(escape`
              SELECT *
              FROM client
              ORDER BY client_id
            `);
        },
        getClient: async (_, args) => {
        },
        createClient: async (_, args) => {
        },
        updateClient: async (_, args) => {
        },
        deleteClient: async (_, args) => {
        }
    }
};