import Cryptr from 'cryptr'
import bcrypt from 'bcrypt'

import { userService } from '../user/user.service.mjs'
import { logger } from '../../services/logger.service.mjs'

const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')

export const authService = {
    signup,
    login,
    getLoginToken,
    validateToken
}

async function login(userName, password) {
    logger.debug(`auth.service - login with username: ${userName}`)

    const user = await userService.getByUserName(userName)
    if (!user) return Promise.reject('Invalid username or password')
    // TODO: un-comment for real login
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid username or password')

    delete user.password
    user._id = user._id.toString()
    return user
}

async function signup({ userName, password, fullName, imgUrl }) {
    const saltRounds = 10

    logger.debug(`auth.service - signup with userName: ${userName}, fullName: ${fullName}`)
    if (!userName || !password || !fullName) return Promise.reject('Missing required signup information')

    const userExist = await userService.getByUserName(userName)
    if (userExist) return Promise.reject('Username already taken')

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ userName, password: hash, fullName, imgUrl })
}

function getLoginToken(user) {
    const userInfo = { _id: user._id, fullName: user.fullName, userName: user.userName, isAdmin: user.isAdmin }
    return cryptr.encrypt(JSON.stringify(userInfo))
}

function validateToken(loginToken) {
    try {
        const json = cryptr.decrypt(loginToken)
        const loggedinUser = JSON.parse(json)
        return loggedinUser

    } catch (err) {
        console.log('Invalid login token')
    }
    return null
}

// ;(async ()=>{
//     await signup('bubu', '123', 'Bubu Bi')
//     await signup('mumu', '123', 'Mumu Maha')
// })()