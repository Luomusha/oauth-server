import Router from "@koa/router"
import Client from "../../schema/Client"
import { Context } from "koa"
import { authenticate } from "./middleware"

const router = new Router()

router.use(authenticate)

router.prefix("/clients")

router.get("/", async (ctx) => {
    const total = await Client.count()
    const clients = await Client.findAll()
    ctx.body = {
        clients,
        total
    }
})

router.get("/:id", async (ctx) => {
    const { id } = ctx.params
    const client = await Client.findByPk(id, { include: "users" })
    ctx.body = client
})

router.post("/", async (ctx: Context, next) => {
    const { name, logo, description, redirectUris, grants } = ctx.request.body
    ctx.log.info(ctx.request.method, ctx.request.body)
    ctx.assert(name, 400, "name is required")
    ctx.assert(logo, 400, "logo is required")
    ctx.assert(description, 400, "description is required")
    ctx.assert(redirectUris, 400, "redirectUris is required")
    ctx.assert(grants, 400, "grants is required")
    ctx.assert(typeof (logo) === "string", 400, "logo need to be string")
    ctx.assert(Array.isArray(redirectUris), 400, "redirectUris need to be arry")
    ctx.assert(Array.isArray(grants), 400, "grants need to be arry")
    const secret = "xxx"
    const client = await Client.create({
        name, logo, description, redirectUris, secret, grants,
    })
    ctx.body = client
    next()
})


export default router