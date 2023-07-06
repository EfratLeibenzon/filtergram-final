// import { spawn } from "child_process"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { storyService } from "../services/story.service.local"

export function StoryDetails(story, isStoryDetailsOpen, setIsStoryDetailsOpen) {
    const navigate = useNavigate()

    // const { storyId } = useParams()
    // const [story, setStory] = useState(null)
    // const { comments } = useSelector((storeState) => storeState.commentModule)

    // useEffect(() => {
    //     loadStory()
    //     // loadComment(storyId)
    // }, [story])


    // async function loadStory() {
    //     try {
    //         storyToShow = await storyService.getById(story._id)
    //     } catch (err) {
    //         console.log('couldnt load story', err)
    //     }
    // }
    // function onRemoveComment(commentId) {
    //     removeComment(commentId)
    //         .then(() => {
    //             console.log('comment with id', commentId, ' has removed')
    //         })
    //         .catch((err) => {
    //             console.log('cannot remove comment with id', commentId, err)
    //         })
    // }


    // function onAddComent() {
    //     let comment = commentsService.getEmptyComment()
    //     comment.txt = prompt('Add your Comment:')


    // }



    return (
        <div className="story-details-container">
            <div className="story-details">
                {/* <section>
                {story.imgUrl && <img src={story.imgUrl} />}
            </section>
            <section>
                {story.txt && <span>{story.txt}</span>}
            </section> */}
                <button onClick={() => navigate(-1)}>Close</button>

                <span>hello from details</span>
            </div>
        </div>
    )
}