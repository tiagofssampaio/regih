import { PrismaClient } from '@prisma/client'
import { fromBuffer } from 'file-type'
import fs from 'fs'

const fsPromise = fs.promises

const prisma = new PrismaClient(/* { log: ["query"] } */)

const resolvers = {
  Client: {
    projects: async (parent, { take, skip, orderBy, filters }): Promise<any> =>
      await prisma.project.findMany({
        where: {
          clientId: parent.id
        },
        take,
        skip,
        orderBy
      })
  },
  Project: {
    client: async (parent: any): Promise<any> =>
      await prisma.client.findUnique({
        where: {
          id: parent.clientId
        }
      }),
    tasks: async (parent, { take, skip, orderBy, filters }): Promise<any> =>
      await prisma.task.findMany({
        where: {
          projectId: parent.id
        },
        take,
        skip,
        orderBy
      })
  },
  Task: {
    project: async (parent): Promise<any> =>
      await prisma.project.findUnique({
        where: {
          id: parent.projectId
        }
      }),
    history: async (parent, { take, skip, orderBy, filters }): Promise<any> =>
      await prisma.taskHistory.findMany({
        where: {
          taskId: parent.id
        },
        take,
        skip,
        orderBy
      }),
    invoice: async (parent): Promise<any> =>
      await prisma.invoice.findUnique({
        where: {
          id: parent.invoiceId
        }
      })
  },
  Invoice: {
    tasks: async (parent): Promise<any> =>
      await prisma.task.findMany({
        where: {
          invoiceId: parent.id
        }
      })
  },
  Query: {
    client: async (_, { id }): Promise<any> =>
      await prisma.client.findUnique({
        where: { id }
      }),
    clients: async (_, { take, skip, orderBy }): Promise<any> =>
      /**
       * TODO
       * pagination and filters
       * relation with task and task_time
       */
      await prisma.client.findMany({
        take,
        skip,
        orderBy
      }),
    project: async (_, { id }): Promise<any> =>
      await prisma.project.findUnique({
        where: { id }
      }),
    projects: async (_, { take, skip, orderBy, filters }): Promise<any> =>
      /**
       * TODO
       * pagination and filters
       */
      await prisma.project.findMany({
        take,
        skip,
        orderBy
      }),
    task: async (_, { id }): Promise<any> =>
      await prisma.task.findUnique({
        where: { id }
      }),
    tasks: async (_, { take, skip, orderBy, where }): Promise<any> =>
    /**
       * TODO
       * pagination and filters
       */

      await prisma.task.findMany({
        take,
        skip,
        orderBy,
        where
      }),
    invoice: async (_, { id }): Promise<any> =>
      await prisma.invoice.findUnique({
        where: { id }
      }),
    invoices: async (_, { take, skip, orderBy, filters }): Promise<any> =>
      /**
       * TODO
       * pagination and filters
       * relation with task
       */
      await prisma.invoice.findMany({
        take,
        skip,
        orderBy
      })
  },
  Mutation: {
    createClient: async (_, data): Promise<any> =>
      await prisma.client.create({
        data
      }),
    updateClient: async (): Promise<any> => {
      return true
    },
    deleteClient: async (_, { id }): Promise<boolean> => {
      try {
        await prisma.client.delete({
          where: {
            id
          }
        })
      } catch (e) {
        return false
      }
      return true
    },

    createTask: async (_, data): Promise<any> =>
      await prisma.task.create({
        data
      }),
    updateTask: async (_, args): Promise<any> => {
      return true
    },
    deleteTask: async (_, { id }): Promise<boolean> => {
      try {
        await prisma.task.delete({
          where: { id }
        })
      } catch (e) {
        return false
      }
      return true
    },

    addTaskHistory: async (_, data): Promise<any> => {
      console.log('data', data)

      return await prisma.taskHistory.create({
        data
      })
    },
    editTaskHistory: async (_, data): Promise<any> => {
      const { id } = data
      delete data.id

      return await prisma.taskHistory.upsert({
        where: { id },
        update: { ...data },
        create: { ...data }
      })
    },

    createInvoice: async (_, data): Promise<void> => {
      await prisma.invoice.create({
        data
      })
    },
    uploadInvoice: async (_, { invoiceId, file }): Promise<boolean> => {
      try {
        const mimeInfo = await fromBuffer(Buffer.from(file, 'base64'))

        // @ts-ignore
        if (mimeInfo.mime !== 'application/pdf' && mimeInfo.mime !== 'application/jpeg' && mimeInfo.mime !== 'application/png') {
          return false
        }

        const invoiceFileName = `invoice_${invoiceId}.${mimeInfo.ext}`
        const invoiceFilePath = `invoices/${invoiceFileName}`

        await fsPromise.writeFile(invoiceFilePath, file, {
          encoding: 'base64'
        })
      } catch (e) {
        console.error(e)
        return false
      }
      return true
    },
    updateInvoice: async (): Promise<boolean> => {
      return true
    },
    deleteInvoice: async (_, { id }): Promise<boolean> => {
      try {
        await prisma.invoice.delete({
          where: {
            id
          }
        })
      } catch (e) {
        return false
      }
      return true
    }
  }
}

export default resolvers
