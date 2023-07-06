import { loadStories } from "../store/story.actions"
import { loadUsers } from "../store/user.actions"
import { useEffect } from "react"
import { commentIcon, likeIcon } from "./icons"

import { storyService } from "../services/story.service.local"
// const stories = useSelector(storeState => storeState.storyModule.stories)

export function PreviewGrid({ stories }) {

    console.log('stories fron grid.jsx', stories)
    useEffect(() => {
        loadStories()
        loadUsers()
    }, [])

    // console.log('Grid stories 1', stories)
    // const savedStories = stories.map(story => storyService.getById(story._id).then(story))
    // console.log('Grid stories 2', savedStories)

    return (
        < div className="stories-row" >
            <ul className="story-grid clean-list">
                {stories.map(story => {
                    return <li className="story-grid-preview" key={story._id}>
                        <img className="story-grid-img" src={story.img.url} style={story.img.style} alt="" />
                        <span class="like-icon"><i class="fa fa-heart" style={{ color: 'white' }}></i></span><span className="likes-count">{story.likedBy.length}</span>
                        <span class="comment-icon" className="x1lliihq1 x1n2onr61"><svg aria-label="Comment" className="x1lliihq x1n2onr6"  fill="none" height="17" role="img" viewBox="0 0 24 24" width="17"><title>Comment</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="rgb(255, 255, 255)" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg></span><span className="comments-count">{story.likedBy.length}</span>

                    </li>
                }
                )
                }
            </ul>
        </div >
    )
}