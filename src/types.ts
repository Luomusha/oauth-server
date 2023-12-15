
export interface User {
    readonly id: string
    username: string
    avatar: string
    createdAt?: Date
    updatedAt?: Date
    clients?: Client[]
}

export interface UserAuth {
    readonly id: string
    readonly uid: string
    identityType: string
    identifier: string
    certificate: string
    createdAt?: Date
    updatedAt?: Date
}

export interface UserAgent {
    readonly uid: string
    readonly agent: string
    readonly ip: string
}

export interface Client {
    readonly id: string
    secret: string
    name: string
    logo: string
    description: string
    redirectUris: string[]
    grants: string[]
    accessTokenLifetime?: number
    refreshTokenLifetime?: number
    createdAt?: Date
    updatedAt?: Date
    users?: User[]
}

export interface Code {
    readonly authorizationCode: string
    expiresAt: Date
    redirectUri: string
    scope: string
    cid: string
    uid: number
    createdAt?: Date
    updatedAt?: Date
}

export interface Token {
    readonly accessToken: string
    accessTokenExpiresAt: Date
    refreshToken: string
    refreshTokenExpiresAt: Date
    scope: string
    cid: string
    uid: number
    createdAt?: Date
    updatedAt?: Date
}