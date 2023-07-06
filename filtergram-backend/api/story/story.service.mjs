import { dbService } from '../../services/db.service.mjs'
import { logger } from '../../services/logger.service.mjs'
import { utilService } from '../../services/util.service.mjs'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

// async function query() {//filterBy={txt:''}
//     try {
//         // const criteria = {
//         //     vendor: { $regex: filterBy.txt, $options: 'i' }
//         // }
//         const collection = await dbService.getCollection('story')
//         // console.log('collection', collection)
//         // var storyCursor =//.find(criteria)
//         const stories = await collection.find()//.toArray()
//         return stories
//     } catch (err) {
//         logger.error('cannot find stories', err)
//         throw err
//     }
// }

async function query() {
    try {
        const collection = await dbService.getCollection('story')
        const criteria = {}
        var storyCursor = await collection.find(criteria)
        const stories = storyCursor.toArray()
        return stories
    } catch (err) {
        logger.error('cannot find stories', err)
        throw err
    }
}

async function getById(storyId) {
    try {
        const collection = await dbService.getCollection('story')
        const story = collection.findOne({ _id: ObjectId(storyId) })
        return story
    } catch (err) {
        logger.error(`while finding story ${storyId}`, err)
        throw err
    }
}

async function remove(storyId) {
    try {
        const collection = await dbService.getCollection('story')
        await collection.deleteOne({ _id: ObjectId(storyId) })
        return storyId
    } catch (err) {
        logger.error(`cannot remove story ${storyId}`, err)
        throw err
    }
}

async function add(story) {
    try {
        const collection = await dbService.getCollection('story')
        const storyToSave = {
            txt: story.txt,
            img: { url: story.img.url },
            by: { fullName: story.by.fullName, userName: story.by.userName, userId: story.by.userId, userImg: { url: story.by.userImg.url, style: { filter: story.userImg.style.filter } } },
            likedBy: story.likedBy
        }
        const result = await collection.insertOne(storyToSave)
        return result.ops[0]
    } catch (err) {
        logger.error('cannot insert story', err)
        throw err
    }
}

async function update(story) {
    try {
        const storyToSave = {
            txt: story.txt,
            img: story.img.url,
            by: story.by.userName,
            likedBy: story.likedBy
        }
        const collection = await dbService.getCollection('story')
        await collection.updateOne({ _id: ObjectId(story._id) }, { $set: storyToSave })
        return story
    } catch (err) {
        logger.error(`cannot update story ${storyId}`, err)
        throw err
    }
}

// async function addStoryMsg(storyId, msg) {
//     try {
//         msg.id = utilService.makeId()
//         const collection = await dbService.getCollection('story')
//         await collection.updateOne({ _id: ObjectId(storyId) }, { $push: { msgs: msg } })
//         return msg
//     } catch (err) {
//         logger.error(`cannot add story msg ${storyId}`, err)
//         throw err
//     }
// }

// async function removeStoryMsg(storyId, msgId) {
//     try {
//         const collection = await dbService.getCollection('story')
//         await collection.updateOne({ _id: ObjectId(storyId) }, { $pull: { msgs: { id: msgId } } })
//         return msgId
//     } catch (err) {
//         logger.error(`cannot add story msg ${storyId}`, err)
//         throw err
//     }
// }

export const storyService = {
    remove,
    query,
    getById,
    add,
    update,
    // addStoryMsg,
    // removeStoryMsg
}
