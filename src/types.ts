
export interface User {
    id: string
    username: string
}

export interface Client {
    clientId: string
    clientSecret: string
    redirectUris: string[]
    grants: string[]
    accessTokenLifetime: number
    refreshTokenLifetime: number
}

export interface Code {
    authorizationCode: string
    expiresAt: Date
    redirectUri: string
    scope: string
    client: Client
    user: User
}

export interface Token {
    accessToken: string
    accessTokenExpiresAt: Date
    refreshToken: string
    refreshTokenExpiresAt: Date
    scope: string
    client: Client
    user: User
}