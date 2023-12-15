import { Request, Response } from "oauth2-server"
import Router from "@koa/router"
import oauth from "../../common/oauth"

const router = new Router()
router.prefix("/authenticate")

router.post("/", async ctx => {
    const request = new Request(ctx.request)
    const response = new Response(ctx.response)
    try {
        const token = await oauth.authenticate(request, response)
        ctx.body = token
    } catch (err: any) {
        console.log(err)
    }
})

export default router