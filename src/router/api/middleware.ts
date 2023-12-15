import { Request, Response } from "oauth2-server"
import { Context, Next } from "koa"
import { OAUTH_HOST, OAUTH_PORT } from "../../common/config"

export const authenticate = async (ctx: Context, next: Next) => {
    const bearerToken = ctx.request.headers["authorization"]
    ctx.assert(bearerToken, 401, "token is required")
    ctx.assert(!Array.isArray(bearerToken), 401, "token is required")
    const [bearer, token] = bearerToken.split(" ")
    ctx.assert(bearer === "Bearer", 401, "Bearer is required")
    ctx.assert(token, 401, "token is required")
    try {
        const res = await fetch(`http://${OAUTH_HOST}:${OAUTH_PORT}/oauth/authenticate`, {
            method: "POST",
            headers: {
                authorization: "Bearer " + token
            }
        })
        const result = await res.json()
        ctx.state.client = result.client
        ctx.state.user = result.user
        await next()
    } catch (e: any) {
        ctx.status = 401
        ctx.body = e.message
    }
}
