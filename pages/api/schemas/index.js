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

    type Task {
        id: ID
        client: Client
        clientId: Int
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

        tasks: [Task]
        task(id: ID, client_id: String): Task

        invoices: [Invoice]
        invoice(id: ID, task_id: String, client_id: String): Invoice
    }

    type Mutation {
        createClient(name: String, vatId: String, rate: Float): Client
        updateClient(id: Int!, name: String, vat_id: String, rate: Float): Client
        deleteClient(id: Int!): Boolean

        createTask(id: String, vat_id: String, rate: Float): Task
        updateTask(id: ID, name: String, vat_id: String, rate: Float): Task
        deleteTask(id: ID): Boolean
    }

`