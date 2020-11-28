import { gql } from 'apollo-server-micro';

export const typeDefs = gql`    
    type Client {
        id: ID
        name: String
        vatId: String
        rate: Float
        createdAt: String
        tasks: [Task]
    }

    type Project {
        id: ID
        client: Client
        clientId: Int
        description: String
        createdAt: String
        tasks: [Task]
    }
    
    type Task {
        id: ID
        project: Project
        projectId: Int
        description: String
        specialRate: Float
        createdAt: String
        invoice: Invoice
        invoiceId: Int
        times: [TaskTime]
    }

    type TaskTime {
        taskId: String
        startTime: String
        endTime: String
    }

    type Invoice {
        id: ID
        value: Float
        file: String
        isPayed: Boolean
        payedDate: String
        comment: String
        createdAt: String
        tasks: [Task]
    }

    type Query {
        clients: [Client]
        client(id: ID!): Client


        projects: [Project]
        project(id: ID!): Project
        
        tasks: [Task]
        task(id: ID, projectId: String): Task

        invoices: [Invoice]
        invoice(id: ID, task_id: String, project_id: String): Invoice
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