import { NavLink, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import { searchIcon, exploreIcon, homeIcon, reelsIcon, sendIcon, likeIcon, createIcon, moreIcon } from './icons'
import { storyService } from "../services/story.service.local"
import { userService } from "../services/user.service";
import { useState, useEffect } from 'react'
import filtergramLogo from '../assets/img/filtergramLogo.png'
import { logout } from "../store/user.actions";


export function Navbar({ isStoryEdit, setisStoryEdit, user }) {

    const [isExpanned, setIsExpanned] = useState(false)

    function onCreate() {
        setisStoryEdit(true)
        // isStoryEdit? document.StoryEdit.classList.remove('hidden') : document.StoryEdit.classList.add('hidden')
    }

    async function onLogout() {
        try {
            await logout()
            console.log('USER FROM LOGOUT')

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="side-bar">
            <section className="logo">
                <img id="logo-id" src={filtergramLogo} alt="Logo" />
            </section>

            <nav className="main-navbar flex column">

                <NavLink className="navbar-item" to={"/"}><span>{homeIcon}</span><span className="home nav-span">Home</span> </NavLink>
                <NavLink className="navbar-item" to={"/search"}> <span>{searchIcon}</span><span className="nav-span">Search</span></NavLink>
                <NavLink className="navbar-item nav-span" to={"/explore"}><span className="nav-span">{exploreIcon}</span><span className="nav-span">Explore</span></NavLink>
                <NavLink className="navbar-item nav-span" to={"/reels"}><span className="nav-span">{reelsIcon}</span><span className="nav-span">Reels</span></NavLink>
                <NavLink className="navbar-item nav-span" to={"/messages"}><span>{sendIcon}</span><span className="nav-span">Messages</span></NavLink>
                <a className="navbar-item nav-span"><span>{likeIcon}</span><span className="nav-span">Notifications</span></a>
                <a className="navbar-item" onClick={onCreate} > <span>{createIcon}</span><span className="nav-span">Create</span></a>
                <NavLink className="navbar-item profile" to={`/profile/${user._id}`}><img src={user.userImg?.url} style={user.userImg?.style} /><span className=" nav-span">Profile</span> </NavLink>
                <section className="more-menu-container">
                    {/* <a className="navbar-item-more"><span>{moreIcon}</span><span>More</span></a> */}
                    <div className={isExpanned ? 'nav-more open' : 'nav-more'}>
                        <a className='nav-more-btn' onClick={onLogout}>Log out</a>
                    </div>
                    <a className="navbar-item more" onClick={() => setIsExpanned(!isExpanned)}><span>{moreIcon}</span> <span className="nav-span">More</span></a>
                </section>
            </nav>
        </div>
    )
}