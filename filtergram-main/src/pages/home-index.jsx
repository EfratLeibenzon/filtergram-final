import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStories, removeStory } from '../store/story.actions'
import { StoryList } from '../cmps/story-list'
import { StoryEdit } from '../cmps/story-edit'
import { Suggested } from '../cmps/suggested'
import { loadUsers } from '../store/user.actions'

export function HomeIndex() {
    const { stories } = useSelector((storeState) => storeState.storyModule)

    useEffect(() => {
        loadStories()
        console.log(stories)
    }, [])

    async function onRemoveStory(storyId) {
        try {
            await removeStory(storyId)
            console.log('story with id', storyId, ' has removed')
        } catch (err) {
            console.log('cannot remove story with id', storyId, err)
        }
    }

    return (
        <section>
            <div className='home-index flex'>
                <section className='story-container'>
                    <StoryList stories={stories} onRemoveStory={onRemoveStory} />
                </section>
                <Suggested />
            </div >
        </section >
    )
}