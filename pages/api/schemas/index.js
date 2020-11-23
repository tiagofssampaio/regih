import { gql } from 'apollo-server-micro';

export const typeDefs = gql`    
    type Client {
        id: ID!
        name: String
        vatId: String
        rate: Float
        createdAt: String
        tasks: [Task]
    }

    type Task {
        id: ID
        clientId: Int
        description: String
        specialRate: Float
        createdAt: String
        client: Client
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
        comment: String
        createdAt: String
        tasks: [Task]
    }
    
    type TaskInvoice {
        tasks: [Task!]!
        invoice: Invoice!
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
        createClient(name: String, vat_id: String, rate: Float): Client
        updateClient(client_id: ID!, name: String, vat_id: String, rate: Float): Client
        deleteClient(client_id: ID!): Boolean

        createTask(client_id: String, vat_id: String, rate: Float): Task
        updateTask(task_id: ID, name: String, vat_id: String, rate: Float): Task
        deleteTask(task_id: ID): Boolean
    }

`