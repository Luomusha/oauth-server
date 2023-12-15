import Router from "@koa/router"
import Token from "../../schema/Token"
import User from "../../schema/User"
import Client from "../../schema/Client"
import { authenticate } from "./middleware"

const router = new Router()
router.prefix("/tokens")
router.use(authenticate)

router.get("/", async (ctx) => {
    const tokens = await Token.findAll({
        include: [{ model: User }, { model: Client }]
    })
    const total = await Token.count()
    ctx.body = { total, tokens }
})

router.post("/", async (ctx) => {
    ctx.body = "success"
})

export default router
