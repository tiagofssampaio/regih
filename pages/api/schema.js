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
})

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
})

const Query = objectType({
    name: 'Query',
    definition(t) {
        t.crud.client()

        t.list.field('feed', {
            type: 'Client',
            resolve: (_, args, ctx) => {
                return ctx.prisma.post.findMany({
                    where: { published: true },
                })
            },
        })

        t.list.field('filterClients', {
            type: 'Client',
            args: {
                searchString: stringArg({ nullable: true }),
            },
            resolve: (_, { searchString }, ctx) => {
                return ctx.prisma.client.findMany({
                    where: {
                        OR: [
                            { name: { contains: searchString } },
                            { vatId: { contains: searchString } },
                        ],
                    },
                })
            },
        })
    },
})

const schema = makeSchema({
    types: [Query, Client, Task],
    plugins: [nexusPrisma({ experimentalCRUD: true })],
    outputs: {
        schema: __dirname + '/../schema.graphql',
        typegen: __dirname + '/generated/nexus.ts',
    },
    typegenAutoConfig: {
        contextType: 'Context.Context',
        sources: [
            {
                source: '@prisma/client',
                alias: 'prisma',
            },
            {
                source: require.resolve('./context'),
                alias: 'Context',
            },
        ],
    },
})

module.exports = {
    schema,
}