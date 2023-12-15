export const DB_HOST = process.env.DB_HOST || "localhost"
export const DB_PORT = process.env.DB_HOST || 5432
export const DB_USER = process.env.DB_HOST || "postgres"
export const DB_PASS = process.env.DB_HOST || "postgres"

export const PRIVATE_KEY = process.env.PRIVATE_KEY || "private.pem"
export const PUBLIC_KEY = process.env.PUBLIC_KEY || "public.pem"

export const TIMESTAMP_EXPORED_TIME = 1000 * 60 * 10
export const AUTHORIZATION_EXPORED_TIME = 1000 * 60 * 60 * 24 * 60

export const OAUTH_HOST = process.env.OAUTH_HOST || "localhost"
export const OAUTH_PORT = process.env.OAUTH_PORT || 3000

export const ALLOW = "1"
export const REJECT = "0"