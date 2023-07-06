import { StoryPreview } from "./story-preview";
import { LoginSignup } from "./login-signup";
import { useState, useEffect } from 'react'
import { userService } from "../services/user.service";

// export function StoryList({ storys, onRemoveStory, setIsStoryDetailsOpen, isStoryDetailsOpen }) {
export function StoryList({ stories, onRemoveStory }) {
    const [loggedInUser, setUser] = useState(userService.getLoggedinUser())

    // function onChangeLoginStatus(loggedInUser) {
    //     console.log('from header: ', loggedInUser);
    //     setUser(loggedInUser)
    // }

    return (
        <div>
            <ul className="story-list clean-list">
                {/* {
        storys.map(story =>
                <li key={story._id}>
                    <StoryPreview story={story} onRemoveStory={onRemoveStory} setIsStoryDetailsOpen={setIsStoryDetailsOpen} isStoryDetailsOpen={isStoryDetailsOpen} /> */}
                {stories.map(story =>
                    <li className="story-preview column" key={story._id}>
                        <StoryPreview story={story} onRemoveStory={onRemoveStory} />
                    </li>
                )}

            </ul>

            {/* <LoginSignup onChangeLoginStatus={onChangeLoginStatus} /> */}

        </div >
    )
}