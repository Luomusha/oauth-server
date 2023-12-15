import { AccessDeniedError, AuthorizeOptions, Request, Response, ServerError } from "oauth2-server"
import Router from "@koa/router"
import oauth from "../../common/oauth"
import { Context } from "koa"
import { calcTimestampSecret, validateToken } from "../../common/util"
import Client from "../../schema/Client"
import User from "../../schema/User"
import UserClient from "../../schema/UserClient"
import { ALLOW, REJECT } from "../../common/config"

const router = new Router()
router.prefix("/authorize")

router.get("/", async (ctx: Context) => {

    const checkLogin = async () => {
        const token = ctx.cookies.get("TOKEN", { signed: true })
        if (!token) return false
        const jwt = validateToken(token)
        if (!jwt) return false
        if (typeof jwt === "string") return false
        const user = await User.findByPk(jwt.id, { raw: true })
        return user
    }

    const renderLogin = async () => {
        const { response_type, client_id, redirect_uri, scope, state } = ctx.request.query
        ctx.assert(client_id)
        ctx.assert(!Array.isArray(client_id))
        const client = await Client.findByPk(client_id, { raw: true })
        ctx.assert(client)
        ctx.state.clientLogo = client.logo
        ctx.state.clientName = client.name
        ctx.state.returnTo = `/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}&state=${state}`
        ctx.state.timestamp = Date.now().toString();
        ctx.state.timestampSecret = calcTimestampSecret(ctx.state.timestamp)
        await ctx.render("views/login")
    }

    const checkAuth = async (user: User) => {
        const { client_id } = ctx.request.query
        const userClient = await UserClient.findOne({
            where: { cid: client_id, uid: user.id }
        })
        return !!userClient
    }

    const renderAuth = async (user: User) => {
        const { response_type, client_id, redirect_uri, scope, state } = ctx.request.query
        ctx.assert(client_id)
        ctx.assert(!Array.isArray(client_id))
        const client = await Client.findByPk(client_id, { raw: true })
        ctx.assert(client)
        const count = await UserClient.count({ where: { cid: client.id } })
        ctx.state.clientId = client_id
        ctx.state.redirectUri = redirect_uri
        ctx.state.userCount = count
        ctx.state.responseType = response_type
        ctx.state.scope = scope
        ctx.state.state = state
        ctx.state.clientLogo = client.logo
        ctx.state.clientName = client.name
        ctx.state.clientCreatedAt = client.createdAt
        ctx.state.username = user.username
        ctx.state.avatar = user.avatar
        await ctx.render("views/authorize")
    }

    const user = await checkLogin()
    if (!user) return await renderLogin()

    const auth = await checkAuth(user)
    if (!auth) return await renderAuth(user)

    const authenticateHandler = {
        handle: async (request: Request, response: Response) => {
            return user
        }
    }
    const request = new Request(ctx.request);
    const response = new Response(ctx.response);
    try {
        const code = await oauth.authorize(request, response, { authenticateHandler })
        ctx.redirect(`${code.redirectUri}?code=${code.authorizationCode}&state=${request.query?.state}`)
    } catch (err: any) {
        console.log(err)
        if (err instanceof AccessDeniedError) {
            // 转到登录页面
            ctx.status = err.code
            ctx.body = err
        } else if (err instanceof ServerError) {
            console.log("authorize err", err)
        } else {
            ctx.status = err.status
            ctx.body = err.message
        }
    }
})

router.post("/", async (ctx: Context) => {
    const token = ctx.cookies.get("TOKEN", { signed: true })
    ctx.assert(token, 401, "token is required")
    const jwt = validateToken(token)
    ctx.assert(jwt, 401, "jwt is required")
    ctx.assert(typeof jwt !== "string", 401, "jwt is required")
    const { authorize, response_type, client_id, redirect_uri, scope, state } = ctx.request.body
    ctx.assert(authorize, 400, "authorize is required")
    ctx.assert(client_id, 400, "client_id is required")
    ctx.assert(!Array.isArray(client_id), 400, "client_id need to be array")
    ctx.assert(response_type, 400, "response_type is required")
    ctx.assert(redirect_uri, 400, "redirect_uri is required")
    ctx.assert(scope, 400, "scope is required")
    ctx.assert(state, 400, "state is required")
    ctx.assert(authorize === REJECT || authorize === ALLOW, 400, "authorize not valid value")
    if (authorize === REJECT) {
        ctx.status = 403
        return
    }
    const user = await User.findByPk(jwt.id, { raw: true })
    ctx.assert(user, 404, "user not exist")
    const client = await Client.findByPk(client_id, { raw: true })
    ctx.assert(client, 404, "client not exist")

    const uc = await UserClient.create({
        uid: user.id,
        cid: client.id
    })
    console.log(uc)


    const authenticateHandler = {
        handle: (request: Request, response: Response) => {
            return user
        }
    }
    const request = new Request(ctx.request);
    const response = new Response(ctx.response);

    try {
        const code = await oauth.authorize(request, response, { authenticateHandler })
        ctx.redirect(`${code.redirectUri}?code=${code.authorizationCode}&state=${request.query?.state}`)
    } catch (err: any) {
        console.log(err)
        if (err instanceof AccessDeniedError) {
            // 转到登录页面
            ctx.status = err.code
            ctx.body = err
        } else if (err instanceof ServerError) {
            console.log("authorize err", err)
        } else {
            ctx.status = err.status
            ctx.body = err.message
        }
    }


})

export default router
