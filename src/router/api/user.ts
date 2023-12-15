import Router from "@koa/router"
import { Context } from "koa"
import sequelize from "../../common/db"
import { authenticate } from "./middleware"
import User from "../../schema/User"
import Account from "../../schema/Account"

const router = new Router()
router.prefix("/users")
router.use(authenticate)

router.get("/", async (ctx) => {
    const users = await User.findAll()
    const total = await User.count()
    ctx.body = { total, users }
})

router.get("/:id", async (ctx) => {
    const { id } = ctx.params
    const client = await User.findByPk(id)
    ctx.body = client
})

router.post("/", async (ctx: Context, next) => {
    const { username, avatar, identityType, identifier, certificate } = ctx.request.body
    ctx.assert(username, 400, "username is required")
    ctx.assert(avatar, 400, "avatar is required")
    ctx.assert(identityType, 400, "identityType is required")
    ctx.assert(identifier, 400, "identifier is required")
    ctx.assert(certificate, 400, "certificate is required")
    const t = await sequelize.transaction();

    try {
        const user = await User.create({
            username, avatar
        })
        const auth = await Account.create({
            uid: user.id,
            identifier,
            identityType,
            certificate
        })
        await t.commit()
        ctx.body = user
        next()
    } catch (e: any) {
        console.log(e)
        await t.rollback()
        ctx.status = 400
        ctx.body = e.message
    }
})


export default router