import express from 'express'
import { requireAuth } from '../../middlewares/requireAuth.middleware.mjs'
import { log } from '../../middlewares/logger.middleware.mjs'
import { getStories, getStoryById, addStory, updateStory, removeStory } from './story.controller.mjs'//, addStoryMsg, removeStoryMsg 

const router = express.Router()

// We can add a middleware for the entire router:
// router.use(requireAuth)

router.get('/', log, getStories)
router.get('/:id', getStoryById)
router.post('/', requireAuth, addStory)
router.put('/:id', requireAuth, updateStory)
router.delete('/:id', requireAuth, removeStory)
// router.delete('/:id', requireAuth, requireAdmin, removeStory)

router.post('/:id/msg', requireAuth)// addStoryMsg
router.delete('/:id/msg/:msgId', requireAuth)// removeStoryMsg

export const storyRoutes = router
