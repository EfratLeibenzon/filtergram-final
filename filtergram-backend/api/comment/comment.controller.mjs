import { logger } from '../../services/logger.service.mjs'
import { socketService } from '../../services/socket.service.mjs'
import { userService } from '../user/user.service.mjs'
import { authService } from '../auth/auth.service.mjs'
import { reviewService } from './comment.service.mjs'

export async function getReviews(req, res) {
    try {
        const comments = await reviewService.query(req.query)
        res.send(comments)
    } catch (err) {
        logger.error('Cannot get comments', err)
        res.status(400).send({ err: 'Failed to get comments' })
    }
}

export async function deleteReview(req, res) {
    try {
        const deletedCount = await reviewService.remove(req.params.id)
        if (deletedCount === 1) {
            res.send({ msg: 'Deleted successfully' })
        } else {
            res.status(400).send({ err: 'Cannot remove comment' })
        }
    } catch (err) {
        logger.error('Failed to delete comment', err)
        res.status(400).send({ err: 'Failed to delete comment' })
    }
}


export async function addReview(req, res) {

    var { loggedinUser } = req

    try {
        var comment = req.body
        comment.byUserId = loggedinUser._id
        comment = await reviewService.add(comment)

        // prepare the updated comment for sending out
        comment.aboutUser = await userService.getById(comment.aboutUserId)

        // Give the user credit for adding a comment
        // var user = await userService.getById(comment.byUserId)
        // user.score += 10
        loggedinUser.score += 10

        loggedinUser = await userService.update(loggedinUser)
        comment.byUser = loggedinUser

        // User info is saved also in the login-token, update it
        const loginToken = authService.getLoginToken(loggedinUser)
        res.cookie('loginToken', loginToken)

        delete comment.aboutUserId
        delete comment.byUserId

        socketService.broadcast({ type: 'comment-added', data: comment, userId: loggedinUser._id })
        socketService.emitToUser({ type: 'comment-about-you', data: comment, userId: comment.aboutUser._id })

        const fullUser = await userService.getById(loggedinUser._id)
        socketService.emitTo({ type: 'user-updated', data: fullUser, label: fullUser._id })

        res.send(comment)

    } catch (err) {
        logger.error('Failed to add comment', err)
        res.status(400).send({ err: 'Failed to add comment' })
    }
}

