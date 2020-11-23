import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ["query"] });

export const resolvers = {
    Query: {
        client: async (_, { id }, _ctx, info) => {

            const client = await prisma.client.findMany({
                where: { id },
            })


            console.log(client)

            return client;
        },
        clients: async (_, { client_id }, _ctx, info) => {
            /**
             * TODO
             * pagination and filters
             * relation with task and task_time
             */
            const clients = await prisma.client;


            console.log('clients', clients)

            return clients;

        },

        task: async (_, { task_id }, _ctx, info) => {

        },

        tasks: async (_, { task_id }, _ctx, info) => {
            /**
             * TODO
             * pagination and filters
             * relation with task and task_time
             */
        },

        invoice: (_, { invoice_id }) => {

        },

        invoices: async (_, args) => {
            /**
             * TODO
             * pagination and filters
             * relation with task
             */
        }
    },
    Mutation: {
        createClient: async (_, { name, vat_id, rate }) => {
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