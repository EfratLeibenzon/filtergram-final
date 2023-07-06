import { StoryList } from "../cmps/story-list";
import { UserDetails } from "../cmps/user-details";
import { LoginSignup } from "../cmps/login-signup";
import { useState } from "react";
import { useEffect } from "react";
import { userService } from "../services/user.service";
import { PreviewGrid } from "../cmps/grid";
import { useSelector } from "react-redux";
import { loadStories } from "../store/story.actions";

export function Profile() {
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    // const stories = useSelector(storeState => storeState.userModule.stories)
    const stories = useSelector(storeState => storeState.storyModule.stories)
    console.log('loggedInUser.userStories', loggedInUser)
    console.log('Stories before loadstories', stories)

    useEffect(() => {
        loadStories()
    }, [])

    console.log('Stories after loadstories', stories)
    // 

    // function onChangeLoginStatus(loggedInUser) {
    //     console.log('from header: ', loggedInUser);
    //     setUser(loggedInUser)
    // }

    return (
        <div className="profile-page flex column">
            <UserDetails />
            <div className="posts-menu">
                <section className="posts">
                    <a aria-selected="true" role="tab"><div><svg aria-label="" className="posts" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="12" role="img" viewBox="0 0 24 24" width="12"><rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line>
                    </svg><span>Posts</span></div></a>
                </section>
            </div>
            <PreviewGrid stories={stories} />
            <section className="user-stories grid">
            </section>
        </div>
    )
}