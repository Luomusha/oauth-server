import OAuth2Server, { AuthorizationCodeModel, ClientCredentialsModel, PasswordModel, RefreshTokenModel } from 'oauth2-server'
import Token from '../schema/Token'
import Code from '../schema/Code'
import Client from '../schema/Client'
import User from '../schema/User'
import Account from '../schema/Account'

const model: AuthorizationCodeModel | PasswordModel | ClientCredentialsModel | RefreshTokenModel = {

    async getAccessToken(accessToken,) {
        const token = await Token.findByPk(accessToken, { raw: true })
        if (!token) return false
        const client = await Client.findByPk(token.cid, { raw: true })
        if (!client) return false
        const user = await User.findByPk(token.uid, { raw: true })
        if (!user) return false
        return { ...token, user, client }
    },
    async getRefreshToken(refreshToken) {
        const token = await Token.findOne({
            where: { refreshToken },
            raw: true
        })
        if (!token) return false
        const client = await Client.findByPk(token.cid, { raw: true })
        if (!client) return false
        const user = await User.findByPk(token.uid, { raw: true })
        if (!user) return false
        return { ...token, user, client }
    },
    async verifyScope(accessToken, scope,) {
        return !!accessToken.scope && Array.from(accessToken.scope).flat().every(s => scope.includes(s))
    },
    // async generateAccessToken(client, user, scope: string | string[]) {
    //     return ""
    // },
    // async generateRefreshToken(client, user, scope: string | string[]) {
    //     return ""
    // },
    // async generateAuthorizationCode(client, user, scope: string | string[]) {
    //     return ""
    // },
    async getAuthorizationCode(authorizationCode) {
        const code = await Code.findByPk(authorizationCode, { raw: true })
        if (!code) return false
        const client = await Client.findByPk(code.cid, { raw: true })
        if (!client) return false
        const user = await User.findByPk(code.uid, { raw: true })
        if (!user) return false
        return { ...code, user, client }
    },
    async getClient(clientId, clientSecret,) {
        const client = await Client.findByPk(clientId, { raw: true })
        if (clientSecret && client?.secret !== clientSecret) return false
        return client
    },
    async saveToken(token, client, user,) {
        await Token.create({ ...token, uid: user.id, cid: client.id })
        return { ...token, client, user }
    },
    async saveAuthorizationCode(code, client, user) {
        await Code.create({ ...code, uid: user.id, cid: client.id })
        return { ...code, client, user }
    },
    async revokeAuthorizationCode(code,) {
        const instance = await Code.findByPk(code.authorizationCode)
        if (!instance) return false
        await instance?.destroy()
        return true
    },
    async validateScope(user, client, scope,) {
        // todo  为落实员工福利政策 生日是今天的二部的员工 在12:00前 在B1101会议室 可以领取 一个     生日蛋糕
        //       why             who                when      where        how    howmuch  what
        // Client ———— Policy ———— scope
        // why policy
        // who user
        // where ip
        // what client 
        // when now()
        // how scope
        // howmuch scope
        const policy = []
        const now = new Date()
        console.log(user)
        console.log(client)
        console.log(scope)
        console.log(scope)
        return scope
    },

    async getUser(identifier, certificate,) {
        const auth = await Account.findOne({
            where: {
                identityType: "email",
                identifier,
                certificate,
            }
        })
        const user = await User.findByPk(auth?.uid, { raw: true })
        return user
    },
    async getUserFromClient(client) {
        console.log(client)
        const user = await User.findOne({ raw: true })
        console.log(user)
        return user
    },
    async revokeToken(token) {
        const instance = await Token.findByPk(token.accessToken)
        if (!instance) return false
        await instance?.destroy()
        return true
    }
}

const oauth = new OAuth2Server({ model })

export default oauth
