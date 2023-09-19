import { fastify } from 'fastify'
// import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify()

//const database = new DatabaseMemory()
const database = new DatabasePostgres()

// CREATE
server.post('/videos', async (request, reply) => {
    // Request Body
    const {title, description, duration} = request.body

    await database.create({
        // short sintaxe
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})

// READ
server.get('/videos', async (request) => {
    // Query params
    const search = request.query.search
    const videos = await database.list(search)

    console.log(videos)
    return videos
})

// UPDATE
// Router parameters '/:id'
server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const {title, description, duration} = request.body

    await database.update(videoId, {
        title,
        description,
        duration,
    })
    return reply.status(204).send()
})

// DELETE
// Router parameter '/:id'
server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)
    return reply.status(204).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
})