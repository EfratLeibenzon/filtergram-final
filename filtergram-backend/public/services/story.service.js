
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'



export const storyService = {
    query,
    getById,
    save,
    remove,
    getEmptyStory,
}
window.cs = storyService

//filterBy = { txt: '', price: 0 }
async function query(filterBy = { by: '' }) {
    return httpService.get('story', filterBy)
}
function getById(storyId) {
    return httpService.get(`story/${storyId}`)
}

async function remove(storyId) {
    return httpService.delete(`story/${storyId}`)
}
async function save(story) {
    var savedStory
    if (story._id) {
        savedStory = await httpService.put(`story/${story._id}`, story)

    } else {
        savedStory = await httpService.post('story', story)
    }
    return savedStory
}

function getEmptyStory() {
    return {
        txt: '',
        createdAt: null,
        img: { url: '', style: { filter: 'none' } },
        by: userService.getLoggedinUser(),
    }
}





