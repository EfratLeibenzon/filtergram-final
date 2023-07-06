import { NavLink, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import { searchIcon, exploreIcon, homeIcon, reelsIcon, sendIcon, likeIcon, createIcon, moreIcon } from './icons'
import { storyService } from "../services/story.service.local"
import { userService } from "../services/user.service";
import { useState, useEffect } from 'react'
import filtergramLogo from '../assets/img/filtergramLogo.png'
import { logout } from "../store/user.actions";


export function NavbarMobile({ isStoryEdit, setisStoryEdit, user }) {

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
        <div className="mobile-navbar">
            <section className="side-bar">
                {/* <section className="logo">
                <img id="logo-id" src={filtergramLogo} alt="Logo" />
            </section> */}

                <nav className="main-navbar flex column">

                    <a className="home-nav-bar"><NavLink to={"/"}>{homeIcon}</NavLink></a>
                    <a className="search-nav-bar"><NavLink className="navbar-item" to={"/search"}> <span className="search-icon">{searchIcon}</span></NavLink></a>
                    {/* <a className="explore-nav-bar"><NavLink to={"/explore"}><span className="nav-span">{exploreIcon}</span><span className="nav-span"></span></NavLink></a> */}
                    {/* <a className="reels-nav-bar"><NavLink className="navbar-item nav-span" to={"/reels"}><span className="nav-span">{reelsIcon}</span><span className="nav-span"></span></NavLink></a> */}
                    {/* <a className="messages-nav-bar"><NavLink className="navbar-item" to={"/messages"}><span className="nav-span">{sendIcon}</span></NavLink></a> */}
                    <a className="create-nav-bar" onClick={onCreate} ><span className="nav-span">{createIcon}</span></a>
                    <a className="like-nav-bar"><span className="nav-span">{likeIcon}</span></a>
                    <a className="profile-nav-bar"><NavLink className="navbar-item profile" to={`/profile/${user._id}`}><span className="nav-span"><img src={user.userImg?.url} style={user.userImg?.style} /></span> </NavLink></a>
                    <section className="more-menu-container">
                        {/* <a className="navbar-item-more"><span>{moreIcon}</span><span>More</span></a> */}
                        <div className={isExpanned ? 'nav-more open' : 'nav-more'}>
                            <a className='nav-more-btn' onClick={onLogout}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg></a>
                        </div>
                        <a className="menu-nav-bar" onClick={() => setIsExpanned(!isExpanned)}><span className="nav-span">{moreIcon}</span></a>
                    </section>
                </nav>
            </section>
        </div>
    )
}