import { gql } from 'apollo-server-micro';

export const typeDefs = gql`

    scalar DateTime

    enum OrderByArg {
        asc
        desc
    }

    input DateTimeFilter {
        equals: DateTime
        gt: DateTime
        gte: DateTime
        in: [DateTime!]
        lt: DateTime
        lte: DateTime
        not: DateTime
        notIn: [DateTime!]
    }

    input StringFilter {
        contains: String
        endsWith: String
        equals: String
        gt: String
        gte: String
        in: [String!]
        lt: String
        lte: String
        not: String
        notIn: [String!]
        startsWith: String
    }

    input WhereInput {
        AND: [WhereInput!]
        id: Int
        NOT: [WhereInput!]
        OR: [WhereInput!]
    }

    type Client {
        id: ID
        name: String
        vatId: String
        rate: Float
        createdAt: DateTime
        projects(take: Int, skip: Int): [Project]
    }

    type Project {
        id: ID
        name: String
        client: Client
        clientId: Int
        description: String
        createdAt: DateTime
        tasks(take: Int, skip: Int, where: WhereInput): [Task]
    }

    type Task {
        id: ID
        project: Project
        projectId: Int
        description: String
        specialRate: Float
        createdAt: DateTime
        invoice: Invoice
        invoiceId: Int
        history(take: Int, skip: Int, where: WhereInput): [TaskHistory]
    }

    type TaskHistory {
        id: ID
        task: Task
        taskId: Int
        comment: String
        startDate: DateTime
        endDate: DateTime
    }

    type Invoice {
        id: ID
        value: Float
        file: String
        isPayed: Boolean
        payedDate: DateTime
        comment: String
        createdAt: DateTime
        tasks(take: Int, skip: Int): [Task]
    }

    type Query {
        clients(take: Int, skip: Int): [Client]
        client(id: ID!): Client

        projects(take: Int, skip: Int): [Project]
        project(id: ID!): Project

        tasks(take: Int, skip: Int, where: WhereInput): [Task]
        task(id: ID, projectId: String): Task

        invoices(take: Int, skip: Int): [Invoice]
        invoice(id: ID): Invoice
    }

    type Mutation {
        createClient(name: String, vatId: String, rate: Float): Client
        updateClient(id: Int!, name: String, vatId: String, rate: Float): Client
        deleteClient(id: Int!): Boolean

        createProject(clientId: Int!, description: String): Project
        updateProject(id: ID!, clientId: Int, description: String): Project
        deleteProject(id: ID!): Boolean
        
        createTask(projectId: Int!, description: String, specialRate: Float, invoiceId: Int): Task
        updateTask(id: ID!, clientId: Int, description: String, specialRate: Float, invoiceId: Int): Task
        deleteTask(id: ID!): Boolean

        addTaskHistory(taskId: Int!, startDate: DateTime, endDate: DateTime): TaskHistory
        editTaskHistory(taskId: Int!, startDate: DateTime, endDate: DateTime): TaskHistory
        
        createInvoice(value: Float, isPayed: Boolean, payedDate: String, comment: String): Invoice
        uploadInvoice(invoiceId: Int!, file: String!): String
        updateInvoice(id: ID!, value: Float, isPayed: Boolean, payedDate: String, comment: String): Invoice
        deleteInvoice(id: ID!): Boolean
    }
`