
import crypto from 'crypto'
import path from "path"
import fs from "fs"
import jwt from "jsonwebtoken"
import { AUTHORIZATION_EXPORED_TIME, PRIVATE_KEY, PUBLIC_KEY } from './config'

export const randomId = () => Math.random().toString(36).slice(2)

export const calcTimestampSecret = (timestamp: string) => {
    // 生成密钥，这里使用一个简单的字符串，实际应用中应该使用更复杂的密钥
    const secretKey = 'your_secret_key';

    // 创建哈希对象
    const hash = crypto.createHmac('sha256', secretKey);

    // 更新哈希对象的数据
    hash.update(timestamp);

    // 获取十六进制表示的哈希值
    const secret = hash.digest('hex');

    return secret
}



export const generateToken = (id: string) => {
    const dir = process.cwd()
    const privateKey = fs.readFileSync(path.join(dir, PRIVATE_KEY), "utf-8")
    return jwt.sign({ id }, privateKey, { algorithm: 'RS256', expiresIn: AUTHORIZATION_EXPORED_TIME })
}

export const validateToken = (token: string) => {
    const dir = process.cwd()
    const publicKey = fs.readFileSync(path.join(dir, PUBLIC_KEY), "utf-8")
    return jwt.verify(token, publicKey,)
}