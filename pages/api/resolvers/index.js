import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(/*{ log: ["query"] }*/);

export const resolvers = {
    Client: {
        tasks: async parent => {
            return await prisma.task.findMany({
                where: {
                    clientId: parent.id
                },
            });
        }
    },
    Task: {
        client: async parent => {
            return await prisma.client.findOne({
                where: {
                    id: parent.clientId
                },
            });
        },
        times: async parent => {
            return await prisma.taskTime.findMany({
                where: {
                    taskId: parent.id
                },
            });
        },
        invoice: async parent => {
            return await prisma.invoice.findOne({
                where: {
                    id: parent.invoiceId
                },
            });
        },
    },
    Invoice: {
        tasks: async parent => {
            return await prisma.task
                .findMany({
                    where: { invoiceId: parent.id },
                });
        }
    },
    Query: {
        client: async (_, { id }, _ctx, info) => {
            return await prisma.client.findOne({
                where: { id },
            });
        },
        clients: async (_, args, _ctx, info) => {
            /**
             * TODO
             * pagination and filters
             * relation with task and task_time
             */
            return await prisma.client.findMany();
        },

        task: async (_, { id }, _ctx, info) => {
            return await prisma.task.findOne({
                where: { id },
            });
        },

        tasks: async (_, args, _ctx, info) => {
            /**
             * TODO
             * pagination and filters
             * relation with task and task_time
             */
            return await prisma.task.findMany();
        },

        invoice: async (_, { id }) => {
            return await prisma.invoice.findOne({
                where: { id },
            });
        },

        invoices: async (_, args, _ctx, info) => {
            /**
             * TODO
             * pagination and filters
             * relation with task
             */
            return await prisma.invoice.findMany();
        }
    },
    Mutation: {
        createClient: async (_, data, _ctx, info) => {
            return await prisma.client.create({
                data
            });
        },
        updateClient: async (_, args) => {
        },
        deleteClient: async (_, { id }) => {
            try {
                const result = await prisma.client.delete({
                    where: {
                        id
                    }
                });
                return !!result.id;
            } catch (e) {
                return false;
            }
        },

        createTask: async (_, args) => {
        },
        updateTask: async (_, args) => {
        },
        deleteTask: async (_, args) => {
        }
    }
};