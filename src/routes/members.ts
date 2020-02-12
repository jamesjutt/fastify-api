import fastify, { FastifyReply } from "fastify"
import { pg } from "../connector/postgres"
import * as http from "http"

const members = async (fastify: fastify.FastifyInstance, options) => {
  fastify.get(
    "/",
    async (
      request: fastify.FastifyRequest,
      reply: fastify.FastifyReply<any>
    ) => {
      interface IGetMembers {
        id: number
        first_name: string
        last_name: string
      }
      const { limit = 5, offset = 0 } = request.query
      try {
        const getUsers: IGetMembers[] = await pg(
          `
        SELECT
          "members"."id",
          "members"."first_name",
          "members"."last_name"
        FROM "members"
        LIMIT $1 OFFSET $2
        `,
          [limit, offset]
        )
        reply.status(200).send({ body: getUsers, success: true })
      } catch (e) {
        console.log(String(e))
        reply.status(400).send({ success: false })
      }
    }
  )
  interface IContact {
    id: number
    phone: string
    city: string
  }
  interface IStatus {
    id: number
    name: string
  }
  interface IGetMembers {
    id: number
    first_name: string
    last_name: string
    status: IStatus
    contact: IContact
  }
  fastify.get(
    "/:memberId",
    async (
      request: fastify.FastifyRequest,
      reply: fastify.FastifyReply<any>
    ) => {
      const { memberId: id } = request.query
      try {
        const getUsers: IGetMembers[] = await pg(
          `
        SELECT
          "members"."id",
          "members"."first_name",
          "members"."last_name"
        FROM "members"
        `,
          []
        )
        reply.status(200).send({ body: getUsers, success: true })
      } catch (e) {
        console.log(String(e))
        reply.status(400).send({ success: false })
      }
    }
  )
}

export default members
