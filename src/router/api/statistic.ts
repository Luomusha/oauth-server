import Router from "@koa/router"
import Token from "../../schema/Token"
import User from "../../schema/User"
import Client from "../../schema/Client"
import { authenticate } from "./middleware"

const router = new Router()
router.prefix("/statistic")
router.use(authenticate)

router.get("/", async (ctx) => {
    const clients = await Client.count()
    const users = await User.count()
    const tokens = await Token.count()
    ctx.body = { clients, users, tokens }
})

export default router
