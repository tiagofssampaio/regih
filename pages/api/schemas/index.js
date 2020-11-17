import { gql } from 'apollo-server-micro';

export const typeDefs = gql`    
    type Client {
        client_id: ID
        name: String
        vat_id: String
        rate: Float
        created_at: String
        tasks: [Task]
    }

    type Task {
        task_id: ID
        client_id: Int
        description: String
        special_rate: Float
        created_at: String
        client: Client!
        times: [TaskTime]
    }

    type TaskTime {
        task_id: String
        start_time: String
        end_time: String
    }

    type Invoice {
        invoice_id: ID
        value: Float
        file: String
        is_payed: Boolean
        comment: String
        created_at: String
        tasks: TaskInvoice
    }
    
    type TaskInvoice {
        tasks: [Task!]!
        invoice: Invoice!
    }

    type Query {
        clients: [Client]
        client(client_id: ID!): Client

        tasks: [Task]
        task(task_id: ID, client_id: String): Task

        invoices: [Invoice]
        invoice(invoice_id: ID, task_id: String, client_id: String): Invoice
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