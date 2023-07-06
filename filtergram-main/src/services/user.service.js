import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import users from '../data/backup-users.json'

export const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser'
const STORAGE_KEY_USERS = 'users'
const STORAGE_KEY_GUEST = 'guest'

// const STORAGE_KEY = 'userDB'

_createUsers()

export const userService = {
    login,
    logout,
    signup,
    query,
    getById,
    // save,
    remove,
    getLoggedinUser,
    getEmptyUser,
    // getUsers,
    queryComments,
    getCommentById,
    getEmptyCredentials,
    getEmptyComment,
    getShortUserInfo,
    _createGuest,
    saveUser,
    getByUserName
}

window.cs = userService


// function saveLocalUser(user) {
//     // user = {_id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, score: user.score}
//     // sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
//     // return user
//     localStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
//     return user
// }

async function saveUser(user) {
    var savedUser
    if (user._id) {
        savedUser = await storageService.put(STORAGE_KEY_USERS, user)
    } else {
        savedUser = await storageService.post(STORAGE_KEY_USERS, user)
    }
    return savedUser
}


async function login({ userName, password }) {
    const user = await getByUserName(userName)
    // const user = users.find(user => user.userName === userCred.userName)
    console.log('user.password', user.password)
    console.log('password', password)
    if (user.password === password) {
        console.log('userName', user)
        _setLoggedinUser(user)
        return user
    }
    // const user = await httpService.post('auth/login', userCred)
    // if (user) {
    //     socketService.login(user._id)
    //     return saveLocalUser(user)
    // }
}

async function getByUserName(userName) {
    const users = await query()
    const user = users.filter((u) => userName === u.userName)
    return user[0]
}

async function logout() {
    storageService.removeUserFromLocalStorage()
    // storageService.remove(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.logout()
    // return await httpService.post('auth/logout')
}

function signup(user) {
    // const user = { username, password, fullname, activities: [] }
    return storageService.post(STORAGE_KEY_USERS, user)
        .then(_setLoggedinUser)
}


// async function query() {
//     var users = await storageService.query(STORAGE_KEY_LOGGEDIN_USER)
//     return users
// }

async function query(filterBy = { fullName: '', userName: '' }) {
    var users = await storageService.query(STORAGE_KEY_USERS).then(users => users)
    if (filterBy.userName) {
        const regExp = new RegExp(filterBy.userName, 'i')
        users = users.filter(user => regExp.test(user.userName))
    }
    if (filterBy.fullName) {
        const regExp = new RegExp(filterBy.fullName, 'i')
        users = users.filter(user => regExp.test(user.fullName))
    }
    return users

    // var users = await storageService.query('user').then(users => users)
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     users = users.filter(user => {
    //         return regex.test(user.username)
    //     })
    //     // users = users.filter(user => regex.test(user.unername) || regex.test(car.description))
    // }
    // return users
    // console.log('get logged in user', storageService.query(STORAGE_KEY_LOGGEDIN_USER))
    // return httpService.get(`user`)
}

function getById(userId) {
    return storageService.get(STORAGE_KEY_USERS, userId)
}

async function remove(userId) {
    await storageService.remove(STORAGE_KEY_USERS, userId)
}

// async function save(user) {
//     var savedUser
//     if (user._id) {
//         savedUser = await storageService.put(STORAGE_KEY_LOGGEDIN_USER, user)
//     } else {
//         savedUser = await storageService.post(STORAGE_KEY_LOGGEDIN_USER, user)
//     }
//     return savedUser
// }

function getLoggedinUser() {
    return utilService.loadFromStorage(STORAGE_KEY_LOGGEDIN_USER)
    // return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getEmptyUser() {
    return {
        fullName: "",
        userName: "",
        password: "",
        mail: '', //not in the starter
        userBio: '', //not in the starter
        userImg: { url: 'https://res.cloudinary.com/duxmabf4n/image/upload/v1686594941/p5igjah3vvmmfpdhs2e5.jpg', style: { filter: 'none' } },
        followingId: [], //provided in the starter as: following
        followersId: [], //provided in the starter as: followers
        following: [
        ],
        followers: [
        ],
        savedStories: [], //provided in the starter as savedStoryIds
        taggedStories: [], //not in the starter
        userStories: [] //not in the starter
    }
}


function queryComments(userId) {
    let user = getById(userId)
    return user.comments
}

function getCommentById(userId, commentId) {
    const comments = queryComments(userId)
    return comments.filter(comment => comment._id === commentId)
}

function getEmptyComment() {
    return {
        by: users[0],
        txt: "",
        likedBy: []
    }
}

function getEmptyCredentials() {
    return {
        userName: '',
        password: '',
        fullName: ''
    }
}

async function getShortUserInfo(userId) {
    const shortUserInfo = await getById(userId)
    return {
        _id: shortUserInfo._id,
        userImg: shortUserInfo.userImg,
        userName: shortUserInfo.userName
    }
}

////////////////////

function _createUsers() {
    const storedUsers = utilService.loadFromStorage(STORAGE_KEY_USERS)
    if (storedUsers?.length > 0) return

    _saveUsers(STORAGE_KEY_USERS, users)
}

function _createGuest() {
    const storedGuest = utilService.loadFromStorage(STORAGE_KEY_GUEST)
    if (storedGuest?.length > 0) {
        return
    }
    const guestUser = users.filter((u) => u._id === 'Guest')
    _saveUsers(STORAGE_KEY_LOGGEDIN_USER, guestUser[0])
}

function _saveUsers(userType, users) {
    utilService.saveToStorage(userType, users)
}

function _setLoggedinUser(user) {
    // if (getLoggedinUser()) {
    //     logout()
    // }
    console.log('asdasd', user)
    utilService.saveToStorage(STORAGE_KEY_LOGGEDIN_USER, user)
    return user
}

