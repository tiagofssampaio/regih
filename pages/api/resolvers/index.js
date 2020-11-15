import db from '../../../lib/db';
import escape from 'sql-template-strings';

export const resolvers = {
    Query: {
        clients: async () => {
            return await db.query(escape`
              SELECT *
              FROM client
              ORDER BY client_id
            `);
        },
        client: async (_, args) => {
        },

        task: async (_, args) => {
        },
        tasks: async (_, args) => {
        }
    },
    Mutation: {
        createClient: async (_, args) => {
        },
        updateClient: async (_, args) => {
        },
        deleteClient: async (_, args) => {
        },

        createTask: async (_, args) => {
        },
        updateTask: async (_, args) => {
        },
        deleteTask: async (_, args) => {
        }
    }
};