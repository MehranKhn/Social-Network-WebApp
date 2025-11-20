import "./comments.scss";

import PostComments from "./postComments";
import { Link } from "react-router-dom";
import moment from "moment";
import useComments from "../../customHook/fetchComments";


function Comments({postCardId}:{postCardId:number}){
   
   const {data:comments,isLoading,isError}=useComments(postCardId);
    
    return(
        <div className="comments">

            <div className="comments-list">
                {isLoading ? (
                    <p className="loading">Loading comments...</p>
                ) : isError ? (
                    <p className="error">Oops! Something went wrong.</p>
                ) : (
                comments?.map((comment) => (
                    
                    <div className="comment" key={`${postCardId}_${comment.id}`}>
                    <div className="comment-header">
                        <Link to={`/profile/${comment.commentUserId}`} className="user-link">
                        {comment.profilePic ? (
                            <img src={comment.profilePic} alt={comment.name} />
                        ) : (
                            <div className="profile-placeholder">
                            {comment.name[0].toUpperCase()}
                            </div>
                        )}
                        </Link>

                        <div className="user-info">
                        <span className="username">{comment.name}</span>
                        <span className="time">{moment(comment.createdAt).fromNow()}</span>
                        </div>
                    </div>

                    <div className="comment-body">
                        <p>{comment.description}</p>
                    </div>
                    </div>
                ))
            )}
            </div>
            <PostComments postCardId={postCardId} />
            </div>

    )
}
export default Comments;

  