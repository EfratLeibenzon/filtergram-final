import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import { Navbar } from './cmps/navbar'
import { HomeIndex } from './pages/home-index'
import { NavbarMobile } from './cmps/navbar-mobile'
import { Explore } from './pages/explore'
import { Profile } from './pages/profile'
import { Messages } from './pages/messages'
import { Reels } from './pages/reels'
import { StoryEdit } from './cmps/story-edit'
import { StoryDetails } from './cmps/story-details'
import { userService } from './services/user.service'
import { loadUser } from './store/user.actions'
import { EditImg } from './cmps/edit-img'
import { LoginSignup } from './cmps/login-signup'
import { Search } from './cmps/search'
import useBreakpoint from 'use-breakpoint'

const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 }



export function RootCmp() {
    const user = useSelector(storeState => (storeState.userModule.loggedInUser))
    const [isStoryEdit, setisStoryEdit] = useState(false)
    const [isStoryDetailsOpen, setIsStoryDetailsOpen] = useState(false)
    const location = useLocation()
    const background = location.state && location.state.background

    const { breakpoint, maxWidth, minWidth } = useBreakpoint(
        BREAKPOINTS,
        'desktop'
    )




    if (!user) {
        return <LoginSignup />
    }

    return (
        <div className='app flex'>
            {breakpoint !== 'mobile' && < Navbar isStoryEdit={isStoryEdit} setisStoryEdit={setisStoryEdit} user={user} />}
            {isStoryEdit && <StoryEdit setisStoryEdit={setisStoryEdit} />}
            <main className='main-section'>
                <Routes location={background || location}>
                    <Route element={<HomeIndex setIsStoryDetailsOpen={setIsStoryDetailsOpen} isStoryDetailsOpen={isStoryDetailsOpen} />} path="/">
                        <Route element={<StoryDetails path={"/story/:storyId"} />} />
                    </Route>
                    <Route element={<Search />} path="/search" />
                    <Route element={<Explore />} path="/explore" />
                    <Route element={<Reels />} path="/reels" />
                    <Route element={<Messages />} path="/messages" />
                    {/* <Route element={<Profile setIsStoryDetailsOpen={setIsStoryDetailsOpen} />} path={'/profile/:userId'} /> */}
                    <Route element={<StoryDetails setIsStoryDetailsOpen={setIsStoryDetailsOpen} isStoryDetailsOpen={isStoryDetailsOpen} />} path={'/StoryDetails/:storyId'} />
                    <Route element={<Profile />} path="/profile/:userId" />
                </Routes>
                {/* {isStoryEdit && <StoryEdit isStoryEdit={isStoryEdit} setisStoryEdit={setisStoryEdit} />} */}
                {/* {isStoryDetailsOpen && <StoryDetails isStoryDetailsOpen={isStoryDetailsOpen} setIsStoryDetailsOpen={setIsStoryDetailsOpen} />}
                {background && (
                    <Routes>
                        <Route path="/StoryDetails/:storyId" element={<StoryDetails />} />
                    </Routes>)} */}

            </main>
            {/* {breakpoint === 'mobile' && <p className="mobile-navbar">sdasdas</p>} */}
            {breakpoint === 'mobile' && <NavbarMobile isStoryEdit={isStoryEdit} setisStoryEdit={setisStoryEdit} user={user}/>}
        </div >
    )
}

