import { useEffect, useRef, useState } from "react"
import { storyService } from "../services/story.service.local"
import { useParams } from "react-router-dom"
import { ImgUploader } from "./img-uploader"
import { addStory } from "../store/story.actions"
import { EditImg } from "./edit-img"
import { CreateStoryTitle } from "./edit-story-title"
import { xButton } from "./icons"
const STAGE_1 = 'STAGE_1'
const STAGE_2 = 'STAGE_2'
const STAGE_3 = 'STAGE_3'

export function StoryEdit({ setisStoryEdit }) {

    let storyToEdit = useRef(storyService.getEmptyStory())
    const { storyId } = useParams()
    const [stage, setStage] = useState(null)

    useEffect(() => {
        if (!storyId) {
            setStage(STAGE_1)
        } else {
            loadStory()
            setStage(STAGE_3)
        }
    }, [])

    async function loadStory() {
        try {
            storyToEdit = await storyService.getById(storyId)
        } catch (err) {
            console.log('couldnt load story', err)
        }
    }

    function onUploaded(imgUrl) {
        storyToEdit.current = { ...storyToEdit.current, img: { ...storyToEdit.current.img, url: imgUrl } }
        setStage(STAGE_2)
    }

    function setImgStyle(newStyle) {
        storyToEdit.current = { ...storyToEdit.current, img: { ...storyToEdit.current.img, style: newStyle } }
        setStage(STAGE_3)
    }

    async function onSaveStory() {
        const timeStamp = Date.now()
        try {
            storyToEdit.current = { ...storyToEdit.current, createdAt: timeStamp, }
            const story = await addStory(storyToEdit.current)
            console.log(`story with id ${story._id} added`)
            // let user=story.by
            // user.userStories.push(story._id)
        } catch (err) {
            console.log('Cannot add story', err)
        }
        finally {
            onCloseEdit()
        }
    }

    function onCloseEdit() {
        setisStoryEdit(false)
    }

    return (
        <div className="story-edit">
            <button className="exit-btn" onClick={onCloseEdit}>{xButton}</button>
            {storyToEdit && <DynamicComponent
                stage={stage}
                onUploaded={onUploaded}
                imgUrl={storyToEdit.current.img.url}
                storyToEdit={storyToEdit}
                setImgStyle={setImgStyle}
                onSaveStory={onSaveStory}
            />}
        </div>
    )
}

function DynamicComponent({ stage, onUploaded, imgUrl, storyToEdit, setImgStyle, onSaveStory }) {
    switch (stage) {
        case STAGE_1:
            return <ImgUploader onUploaded={onUploaded} />
        case STAGE_2:
            return <EditImg imgUrl={imgUrl} setImgStyle={setImgStyle} />
        case STAGE_3:
            return <CreateStoryTitle storyToEdit={storyToEdit} onSaveStory={onSaveStory} />
    }
}
