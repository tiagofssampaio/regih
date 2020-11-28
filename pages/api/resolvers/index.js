import { PrismaClient } from '@prisma/client';
import { fromBuffer } from 'file-type';

import fs from 'fs';
const fsPromise = fs.promises;

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
    Project: {
        client: async parent => {
            return await prisma.client.findUnique({
                where: {
                    id: parent.clientId
                },
            });
        },
        tasks: async parent => {
            return await prisma.task.findMany({
                where: {
                    projectId: parent.id
                },
            });
        }
    },
    Task: {
        project: async parent => {
            return await prisma.project.findUnique({
                where: {
                    id: parent.projectId
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
            return await prisma.invoice.findUnique({
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
            return await prisma.client.findUnique({
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

        project: async (_, { id }, _ctx, info) => {
            return await prisma.project.findUnique({
                where: { id },
            });
        },

        projects: async (_, args, _ctx, info) => {
            /**
             * TODO
             * pagination and filters
             */
            return await prisma.project.findMany();
        },

        task: async (_, { id }, _ctx, info) => {
            return await prisma.task.findUnique({
                where: { id },
            });
        },

        tasks: async (_, args, _ctx, info) => {
            /**
             * TODO
             * pagination and filters
             */
            return await prisma.task.findMany();
        },

        invoice: async (_, { id }) => {
            return await prisma.invoice.findUnique({
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
                    where: {
                        id
                    }
                });
            } catch (e) {
                return false;
            }
            return true;
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
        deleteInvoice: async (_, { id }) => {
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