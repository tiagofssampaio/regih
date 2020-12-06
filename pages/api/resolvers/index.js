import { PrismaClient } from '@prisma/client';
import { fromBuffer } from 'file-type';

import fs from 'fs';
const fsPromise = fs.promises;

const prisma = new PrismaClient(/*{ log: ["query"] }*/);

export const resolvers = {
    Client: {
        projects: async (parent, { take, skip, orderBy, filters }) => {
            return await prisma.project.findMany({
                where: {
                    clientId: parent.id
                },
                take,
                skip,
                orderBy
            });
        }
    },
    Project: {
        client: async parent => {
            return await prisma.client.findUnique({
                where: {
                    id: parent.clientId
                }
            });
        },
        tasks: async (parent, { take, skip, orderBy, filters }) => {
            return await prisma.task.findMany({
                where: {
                    projectId: parent.id
                },
                take,
                skip,
                orderBy
            });
        }
    },
    Task: {
        project: async parent => {
            return await prisma.project.findUnique({
                where: {
                    id: parent.projectId
                }
            });
        },
        history: async (parent, { take, skip, orderBy, filters  }) => {
            return await prisma.taskHistory.findMany({
                where: {
                    taskId: parent.id
                },
                take,
                skip,
                orderBy
            });
        },
        invoice: async parent => {
            return await prisma.invoice.findUnique({
                where: {
                    id: parent.invoiceId
                }
            });
        },
    },
    Invoice: {
        tasks: async parent => {
            return await prisma.task.findMany({
                where: {
                    invoiceId: parent.id
                }
            });
        }
    },
    Query: {
        client: async (_, { id }, context, info) => {
            return await prisma.client.findUnique({
                where: { id },
            });
        },
        clients: async (_, { take, skip, orderBy }, context, info) => {
            /**
             * TODO
             * pagination and filters
             * relation with task and task_time
             */
            return await prisma.client.findMany({
                take,
                skip,
                orderBy
            });
        },
        project: async (_, { id }, context, info) => {
            return await prisma.project.findUnique({
                where: { id },
            });
        },
        projects: async (_, { take, skip, orderBy, filters  }, context, info) => {
            /**
             * TODO
             * pagination and filters
             */
            return await prisma.project.findMany({
                take,
                skip,
                orderBy
            });
        },
        task: async (_, { id }, context, info) => {
            return await prisma.task.findUnique({
                where: { id },
            });
        },
        tasks: async (_, { take, skip, orderBy, where }, context, info) => {
            /**
             * TODO
             * pagination and filters
             */

            return await prisma.task.findMany({
                take,
                skip,
                orderBy,
                where
            });
        },
        invoice: async (_, { id }) => {
            return await prisma.invoice.findUnique({
                where: { id },
            });
        },
        invoices: async (_, { take, skip, orderBy, filters }, context, info) => {
            /**
             * TODO
             * pagination and filters
             * relation with task
             */
            return await prisma.invoice.findMany({
                take,
                skip,
                orderBy
            });
        }
    },
    Mutation: {
        createClient: async (_, data, context, info) => {
            return await prisma.client.create({
                data
            });
        },
        updateClient: async (_, args) => {
        },
        deleteClient: async (_, { id }) => {
            try {
                await prisma.client.delete({
                    where: {
                        id
                    }
                });
            } catch (e) {
                return false;
            }
            return true;
        },

        createTask: async (_, data) => {
            return await prisma.task.create({
                data
            });
        },
        updateTask: async (_, args) => {
        },
        deleteTask: async (_, args) => {
            try {
                await prisma.task.delete({
                    where: { id }
                });
            } catch (e) {
                return false;
            }
            return true;
        },

        addTaskHistory: async (_, data) => {

            console.log('data', data);

            return await prisma.taskHistory.create({
                data
            });
        },
        editTaskHistory: async (_, data) => {
            const { id } = data;
            delete data.id;

            return await prisma.taskHistory.upsert({
                where: { id },
                update: {...data},
                create: {...data}
            });
        },

        createInvoice: async (_, data) => {
            return await prisma.invoice.create({
                data
            });
        },
        uploadInvoice: async (_, { invoiceId, file }) => {
            try {
                const mimeInfo = await fromBuffer(Buffer.from(file, 'base64'));

                if (mimeInfo.mime !== 'application/pdf' &&
                    mimeInfo.mime !== 'application/jpeg' &&
                    mimeInfo.mime !== 'application/png'
                ) {
                    return false;
                }

                const invoiceFileName = "invoice_" + invoiceId + "." + mimeInfo.ext;
                const invoiceFilePath = "invoices/" + invoiceFileName;

                await fsPromise.writeFile(invoiceFilePath, file, { encoding: "base64" });
            } catch (e) {
                console.error(e);
                return false;
            }
            return true;
        },
        updateInvoice: async (_, args) => {
        },
        deleteInvoice: async (_, { id: Int }) => {
            try {
                await prisma.invoice.delete({
                    where: {
                        id
                    }
                });
            } catch (e) {
                return false;
            }
            return true;
        }
    }
};