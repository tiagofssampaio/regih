import db from '../../../lib/db';
import escape from 'sql-template-strings';

export const resolvers = {
    Query: {
        client: async (_, args) => {
            /**
             * TODO
             * get client
             */
        },
        clients: async () => {
            /**
             * TODO
             * pagination and filters
             * relation with task and task_time
             */
            return await db.query(escape`
              SELECT *
              FROM client
              ORDER BY client_id
            `);
        },

        task: async (_, args) => {
            /**
             * TODO
             * get task with all relations
             */
        },
        tasks: async (_, args) => {
            /**
             * TODO
             * pagination and filters
             * relation with client, task_time, invoice
             */
        }
    },
    Mutation: {
        createClient: async (_, args) => {
            return await db.query(escape`
                INSERT INTO client (name, vat_id, rate) VALUES ('${args.name}', '${args.vat_id}', ${args.rate})
            `)
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