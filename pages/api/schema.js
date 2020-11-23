import { nexusPrisma } from 'nexus-plugin-prisma';
import { idArg, makeSchema, objectType, stringArg } from '@nexus/schema';

const Client = objectType({
    name: 'Client',
    definition(t) {
        t.model.id()
        t.model.name()
        t.model.vatId()
        t.model.rate()
        t.model.createdAt()
        t.model.tasks({
            pagination: false,
        })
    },
});

const Task = objectType({
    name: 'Task',
    definition(t) {
        t.model.id()
        t.model.clientId()
        t.model.description()
        t.model.specialRate()
        t.model.createdAt()
        t.model.client()
    },
});

const Query = objectType({
    name: 'Query',
    definition(t) {
        t.crud.client()
        t.crud.task()
    },
});

export default makeSchema({
    types: [Query, Client, Task],
    plugins: [nexusPrisma({ experimentalCRUD: true })],
    outputs: {
        schema: process.cwd() + '/../schema.graphql',
        typegen: process.cwd() + '/generated/nexus.ts',
    },
    typegenAutoConfig: {
        contextType: 'Context.Context',
        sources: [
            {
                source: '@prisma/client',
                alias: 'prisma',
            },
            {
                source: process.cwd() + '/pages/api/context.ts',
                alias: 'Context',
            },
        ],
    },
});