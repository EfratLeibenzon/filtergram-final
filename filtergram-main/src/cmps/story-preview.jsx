import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { CommentAdd } from './comment-add'
import { CommentList } from './comment-list'
import { LikeBtn } from './like-btn.jsx'
import { toggleLike } from '../store/story.actions.js'
import { commentIcon, likeIcon, optionsIcon, savedIcon, sendIcon, trashIcon } from './icons'
import { StoryDetails } from './story-details'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { LongTxt } from './long-txt'

// export function StoryPreview({ story, onRemoveStory, setIsStoryDetailsOpen, isStoryDetailsOpen }) {
export function StoryPreview({ story, onRemoveStory }) {
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const isLiked = story.likedBy.some((u) => u._id === user._id) || null
    // const navigate = useNavigate()
    const location = useLocation()
    const [isExpanned, setIsExpanned] = useState(false)
    const onToggleLike = useCallback(() => {
        toggleLike(story, user)
    }, [story, user])
    function onOpenStoryDetails(storyId) {
        // setIsStoryDetailsOpen(true)
        // console.log("is details open", isStoryDetailsOpen)
        navigate(`/story/:${storyId}`);
    }
    function likesPreview(likesCount) {
        if (likesCount > 1) return <section className="likes">{likesCount} likes</section>
        else if (likesCount === 1) return <section className="like">{likesCount} like</section>
        return <section className="no-likes">no likes yet</section>
    }
    function getComments(comments) {
        const commentsCount = comments.length
        let shownComments = (commentsCount >= 2) ? [comments[commentsCount - 2], comments[commentsCount - 1]] : comments
        const isMore = (comments.length > 2)
        console.log(' comments', comments)

        return (
            <section>
                <CommentList comments={shownComments} />
                {isMore && <button > view all {commentsCount} comments </button>}
            </section>)
    }
    return (
        <article className="story-preview flex column">
            <header className="story-header flex space-between">
                <div className="user-preview flex">
                    <img className="mini-user-img" src={story.by.userImg.url} style={story.by.userImg.style} alt="" />
                    <div className="story-info">
                        <h4 className="user-name">{story.by.userName}</h4>
                    </div>
                </div>
                <div className={isExpanned ? 'remove-menu open' : 'remove-menu'}>
                    <a className='remove-menu-btn' onClick={() => { onRemoveStory(story._id) }}>{trashIcon}</a>
                </div>
                <div className='remove-btn-container flex column' >
                    <button className="icon-btn remove-btn" onClick={() => setIsExpanned(!isExpanned)}>{optionsIcon}</button>
                </div>
                {/*
                <div className='remove-btn-container flex column' >
                    <button className="icon-btn remove-btn" onClick={() => { onRemoveStory(story._id) }}>{optionsIcon}</button>
                </div> */}
            </header>
            <section className='story-img-container' >
                <img className="story-img" src={story.img.url} style={story.img.style} alt="" />
            </section>
            <div className="action-btns">
                {/* <button className='icon-btn'><span>{likeIcon}</span></button> */}
                <LikeBtn className="icon-btn like-btn" toggleLike={onToggleLike} isLiked={isLiked} />
                {/* <button className='icon-btn' onClick={onOpenStoryDetails}><span>{commentIcon}</span></button> */}
                <Link to={`/StoryDetails/:${story._id}`} state={{ background: location }}><span>{commentIcon}</span></Link>
                <button className='icon-btn'><span>{sendIcon}</span></button>
                <button className='icon-btn save'><span>{savedIcon}</span></button>
            </div>
            {likesPreview(story.likedBy.length)}
            <section className='story-title'>
                <p className="user-name">{story.by.userName}</p>
                <LongTxt txt={story.txt} length={119} />
            </section>
            <section className='comments-preview'>{getComments(story.comments)}</section>
            <section><CommentAdd story={story} /></section>
        </article>
    )
}