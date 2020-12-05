import { gql } from 'apollo-server-micro';

export const typeDefs = gql`

    scalar DateTime
    
    type Client {
        id: ID
        name: String
        vatId: String
        rate: Float
        createdAt: DateTime
        projects: [Project]
    }

    type Project {
        id: ID
        client: Client
        clientId: Int
        description: String
        createdAt: DateTime
        tasks: [Task]
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
        times: [TaskTime]
    }

    type TaskTime {
        taskId: String
        startTime: DateTime
        endTime: DateTime
    }

    type Invoice {
        id: ID
        value: Float
        file: String
        isPayed: Boolean
        payedDate: DateTime
        comment: String
        createdAt: DateTime
        tasks: [Task]
    }
    
    type Query {
        clients(take: Int, skip: Int, orderBy: Int): [Client]
        client(id: ID!): Client

        projects: [Project]
        project(id: ID!): Project
        
        tasks: [Task]
        task(id: ID, projectId: String): Task

        invoices: [Invoice]
        invoice(id: ID): Invoice
    }

    type Mutation {
        createClient(name: String, vatId: String, rate: Float): Client
        updateClient(id: Int!, name: String, vat_id: String, rate: Float): Client
        deleteClient(id: Int!): Boolean

        createProject(clientId: Int!, description: String): Project
        updateProject(id: ID!, clientId: Int, description: String): Project
        deleteProject(id: ID!): Boolean
        
        createTask(clientId: Int!, description: String, specialRate: Float, invoiceId: Int): Task
        updateTask(id: ID!, clientId: Int, description: String, specialRate: Float, invoiceId: Int): Task
        deleteTask(id: ID!): Boolean

        createInvoice(value: Float, isPayed: Boolean, payedDate: String, comment: String): Invoice
        uploadInvoice(invoiceId: Int!, file: String!): String
        updateInvoice(id: ID!, value: Float, isPayed: Boolean, payedDate: String, comment: String): Invoice
        deleteInvoice(id: ID!): Boolean
    }
`