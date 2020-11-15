import { gql } from "apollo-server-micro";

export const typeDefs = gql`    
    type Client {
        client_id: ID
        name: String
        vat_id: String
        rate: Float
        created_at: String
    }

    type Task {
        task_id: ID
        client_id: Int
        description: String
        special_rate: Float
        created_at: String
    }

    type TaskTime {
        task_id: String
        start_time: String,
        end_time: String
    }

    type TaskInvoice {
        task_id: String
        invoice_id: String
    }

    type Query {
        getClients: [Client]
        getClient(client_id: ID!): Client
        createClient(name: String, vat_id: String, rate: Float): Client
        updateClient(client_id: ID!, name: String, vat_id: String, rate: Float): Client
        deleteClient(client_id: ID!): Boolean

        getTasks: [Task]
        getTask(task_id: ID, client_id: String): Task
        createTask(client_id: String, vat_id: String, rate: Float): Task
        updateTask(task_id: ID, name: String, vat_id: String, rate: Float): Task
        deleteTask(task_id: String): Boolean
    }`