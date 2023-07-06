import { CommentPreview } from "./comment-preview";
export function CommentList({ comments }) {
    // console.log('comments', comments)

    // if (!comments || comments.length === 0) return <div className="no-comments">No comments yet</div>
    return (
        <ul className="comment-list clean-list">
            {comments.map(comment =>
                <li className="comment-preview column" key={comment._id} >
                    <CommentPreview comment={comment} />
                </li>
            )}

        </ul>
    )
}