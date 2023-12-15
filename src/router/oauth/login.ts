import Router from "@koa/router"
import oauth from "../../common/oauth"
import { Request, Response } from "oauth2-server"
import { AUTHORIZATION_EXPORED_TIME, TIMESTAMP_EXPORED_TIME } from "../../common/config"
import { calcTimestampSecret, generateToken } from "../../common/util"
import User, { Account } from "../../schema/User"
import { Context } from "koa"

const router = new Router()
router.prefix("/login")

router.post("/", async (ctx: Context) => {
    const { identifier, certificate, returnTo, timestamp, timestampSecret } = ctx.request.body
    const secret = calcTimestampSecret(timestamp)
    ctx.assert(secret === timestampSecret, 400, "timestamp secret not valid")

    const dur = Date.now() - Number(timestamp) < TIMESTAMP_EXPORED_TIME
    ctx.assert(dur, 400, "timestamp expired")

    const auth = await Account.findOne({
        where: { identifier },
        raw: true
    })
    ctx.assert(auth, 404, "identifier not found")
    ctx.assert(auth.certificate === certificate, 400, "certificate not match")
    const user = await User.findByPk(auth.uid, { raw: true })
    ctx.assert(user, 404, "user not exist")
    const jwt = generateToken(user.id)
    ctx.cookies.set('TOKEN', jwt, { signed: true, httpOnly: true, overwrite: true, maxAge: AUTHORIZATION_EXPORED_TIME });
    await ctx.redirect(returnTo)
})

export default router
