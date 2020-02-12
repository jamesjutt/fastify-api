import fastify from "fastify"
import members from "./routes/members"

const port = Number(process.env.SERVER_PORT) || 8080
const server: fastify.FastifyInstance = fastify({ logger: true })

const opts: fastify.RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          body: {
            type: "string"
          },
          success: {
            type: "boolean"
          }
        }
      }
    }
  }
}

server.register(members, { prefix: "/members" })

server.get("/", opts, async (req, reply) => {
  return { body: "Hello!", success: true }
})

const startServer = async () => {
  try {
    const response = await server.listen(port, "0.0.0.0")
    console.log(response)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
startServer().then(() => {
  console.log("Server Started")
})
