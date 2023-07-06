import { userServiceHttp } from "../services/user.service.http.js"
import { socketService } from "../services/socket.service.js";
import { store } from '../store/store.js'

import { showErrorMsg } from '../services/event-bus.service.js'
import { LOADING_DONE, LOADING_START } from "./system.reducer.js";
import { REMOVE_USER, SET_LOGGED_IN_USER, SET_USERS, SET_WATCHED_USER, ADD_USER, UPDATE_LOGGEDIN_USER } from "./user.reducer.js";
import { async } from "q";


export async function loadUsers() {
    try {
        store.dispatch({ type: LOADING_START })
        const users = await userServiceHttp.query()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export async function removeUser(userId) {
    try {
        await userServiceHttp.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
    }
}


export async function onAddUser(user) {
    try {
        const savedUser = await userServiceHttp.saveUser(user)
        store.dispatch({
            type: ADD_USER,
            savedUser
        })
        return savedUser
    } catch (err) {
        console.log('Cannot add user', err)
        throw err
    }
}

export async function login(user) {
    try {
        const loggedInUser = await userServiceHttp.login(user)
        console.log('from actions1111111', loggedInUser)
        store.dispatch({
            type: SET_LOGGED_IN_USER,
            loggedInUser
        })
        // socketService.login(user)
        return loggedInUser
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function signup(user) {
    try {
        const loggedInUser = await userServiceHttp.signup(user)
        store.dispatch({
            type: SET_LOGGED_IN_USER,
            loggedInUser
        })
        // socketService.login(user)
        return user
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userServiceHttp.logout()
        store.dispatch({
            type: SET_LOGGED_IN_USER,
            loggedInUser: null
        })
        // socketService.logout()
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

export async function loadUser(userId) {
    try {
        const user = await userServiceHttp.getById(userId);
        store.dispatch({ type: SET_WATCHED_USER, user })
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
    }
}

export async function updateUser(user) {
    try {
        const updatedUser = await userServiceHttp.saveUser(user)
        console.log('updatedUser', updatedUser)
        store.dispatch({
            type: UPDATE_LOGGEDIN_USER,
            updatedUser
        })
        return updateUser
    } catch (err) {
        console.log('Cannot update logged user (id: ' + user._id + ')', err)
        throw err
    }
}

// export async function addStory(story) {
//     try {
//         const savedStory = await storyService.save(story)
//         console.log('Added Story', savedStory)
//         store.dispatch(getActionAddStory(savedStory))
//         return savedStory
//     } catch (err) {
//         console.log('Cannot add story', err)
//         throw err
//     }
// }

// export function isGuest(userId) {
//     const isGuestUser = user._id === 'Guest' ? true : false
//     if (isGuestUser) store.dispatch({ type: SET_WATCHED_USER, userId })
// }

