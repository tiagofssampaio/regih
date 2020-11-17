import Knex from 'knex';

// https://blog.smartive.ch/graphql-and-mysql-solving-the-join-problem-191f40b55961

const mysqlClient = Knex({ client: "mysql", connection: {
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    }
});

function getClient(client_id) {
    return mysqlClient.from("client").where({client_id}).first();
}

function getTask(task_id) {
    return mysqlClient.from("task").where({task_id}).first();
}

function getTasksByClientId(client_id) {
    return mysqlClient.from("task").where({client_id});
}

export const resolvers = {
    Query: {
        client: async (_, { client_id }, _ctx, info) => {

            const query = info.fieldNodes.find(field => field.name.value === info.fieldName);
            const client = await getClient(client_id);

            for (const field of query.selectionSet.selections.filter(f => f.name.value === "tasks")) {
                client.tasks = await getTasksByClientId(client_id);
            }

            return client;
        },
        clients: async (_, { client_id }, _ctx, info) => {
            /**
             * TODO
             * pagination and filters
             * relation with task and task_time
             */

            const query = info.fieldNodes.find(field => field.name.value === info.fieldName);
            const clients = await mysqlClient.from("client");

            for (const field of query.selectionSet.selections.filter(f => f.name.value === "tasks")) {
                await Promise.all(clients.map(async (client) => {
                    client.tasks = await getTasksByClientId(client.client_id);
                    return client;
                }));
            }
            return clients;
        },

        task: async (_, { task_id }, _ctx, info) => {

            const query = info.fieldNodes.find(field => field.name.value === info.fieldName);
            const task = await getTask(task_id);

            for (const field of query.selectionSet.selections.filter(f => f.name.value === "client")) {
                task.client = await getClient(task.client_id);
            }

            return task;
        },

        tasks: async (_, { task_id }, _ctx, info) => {
            /**
             * TODO
             * pagination and filters
             * relation with task and task_time
             */

            const query = info.fieldNodes.find(field => field.name.value === info.fieldName);
            const tasks = await mysqlClient.from("task");

            for (const field of query.selectionSet.selections.filter(f => f.name.value === "client")) {
                await Promise.all(tasks.map(async (task) => {
                    task.client = await getClient(task.client_id);
                    return task;
                }));
            }
            return tasks;
        },

        invoice: (_, { invoice_id }) => mysqlClient.from("invoice").where({ invoice_id }).first(),

        invoices: async (_, args) => {
            /**
             * TODO
             * pagination and filters
             * relation with task
             */
            return client.from("invoice")
        }
    },
    Mutation: {
        createClient: async (_, { name, vat_id, rate }) => {
        },
        updateClient: async (_, args) => {
        },
        deleteClient: async (_, args) => {
        },

        createTask: async (_, args) => {
        },
        updateTask: async (_, args) => {
        },
        deleteTask: async (_, args) => {
        }
    }
};