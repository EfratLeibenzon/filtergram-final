import { useActionData } from 'react-router-dom'
import { Notifications } from './cmps/notifications.jsx'
import { Search } from './cmps/search.jsx'
import { StoryEdit } from './cmps/story-edit.jsx'
import { Suggested } from './cmps/suggested.jsx'
import { Explore } from './pages/explore.jsx'
import { HomeIndex } from './pages/home-index.jsx'
import { Messages } from './pages/messages.jsx'
import { Profile } from './pages/profile.jsx'
import { Reels } from './pages/reels.jsx'
import { StoryDetails } from './pages/story-details.jsx'
import {userService} from './services/user.service'


// console.log('user name from routes.js', userName)

// Routes accesible from the main navigation (in AppHeader)
// const routes = [
//     {
//         path: '/',
//         component: <HomeIndex />,
//         label: 'Home',
//     }, {
//         path: '/explore',
//         component: <Explore />,
//         label: 'Explore',
//     }, {
//         path: '/reels',
//         component: <Reels />,
//         label: 'Reels',
//     }, {
//         path: '/messages',
//         component: <Messages />,
//         label: 'Messages',
//     }, {
//         path: `/${userName}`,
//         component: <Profile />,
//         label: 'Profile',
//     }, {
//         path: '/story/:storyId',
//         component: <StoryDetails />,
//         label: 'StoryDetails',
//     },
//     {
//         path: '/story/edit',
//         component: <StoryEdit />,
//         label: 'Create',
//     },
//     {
//         path: '/story/edit/:storyId',
//         component: <StoryEdit />,
//         label: 'StoryEdit',
//     },
//     {
//         path: '/story/create',
//         component: <StoryEdit />,
//         label: 'Create',
//     }
//     , {
//         path: '/search',
//         component: <Search />,
//         label: 'Search',
//     }, {
//         path: '/notifications',
//         component: <Notifications />,
//         label: 'Notifications',
//     }
// ]

// export default routes