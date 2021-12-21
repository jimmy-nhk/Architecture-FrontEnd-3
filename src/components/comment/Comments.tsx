import axios from "axios";
import { type } from "os";
import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import "./style.css";
//
type CommentsProp = {
  currentUserId?: number ;
  postId: number;
};

export type CommentClass = {
  id: number;
  parentId: number;
  userId: number;
  postId: number;
  datePosted: string;
  body: string;
};

export type ActiveCommentClass = {
    id: number;
    type: "replying" | "editing"
}

function Comments({ currentUserId, postId }: CommentsProp) {
  const [backendComments, setBackendComments] = useState<CommentClass[]>([]);
  const [isReloaded, setIsReloaded] = useState(false);
  const [activeComment, setActiveComment] = useState<ActiveCommentClass | null>(null)

  // this variable below shows the roots comments without parent id
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === 0
  );

  const getReplies = (commentId: number) => {
    return backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a: CommentClass, b: CommentClass) =>
          new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime()
      );
  };

  var commentsAPI = "http://localhost:8080/comments";
  var getAllCommentsAPI = commentsAPI + "/getAllComments/postId=" + 1;
  var createCommentAPI = commentsAPI + "/createComment";
  var deleteCommentAPI = commentsAPI + "/deleteComments/commentId=";
  useEffect(() => {
    if (isReloaded) {
      return;
    }

    axios.get(getAllCommentsAPI).then((res) => {
      console.log(res.data);
      setBackendComments(res.data);
    });

    setIsReloaded(true);
  }, [isReloaded]);

  const addComment = (text: string, parentId: number) => {
    console.log("addComment: ", text, parentId);

    var commentObj = {
      parentId: parentId,
      userId: currentUserId,
      postId: 1,
      datePosted: "date",
      body: text,
    };

    // create comment
    axios.post(createCommentAPI, commentObj).then((res) => {
      setBackendComments([res.data, ...backendComments]);
      setIsReloaded(false);
      setActiveComment(null)
    });
  };

  // delete the comment
  const deleteComment = (commentId: number) => {

    if(window.confirm('Are you sure that you want to remove comment ?')){
        axios.delete(deleteCommentAPI + commentId )
        .then(res => {
            setIsReloaded(false)
        })
    }

  }

  return (
    <div className="comments">
      <h3 className="comments-title">Comments {currentUserId} userId</h3>

      <div className="comment-form-title">Write Comment</div>
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments.map((rootComment) => (

          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            backendComments={backendComments}
            currentUserId={currentUserId}
            deleteComment={deleteComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            parentId={rootComment.id}
            addComment={addComment}
          />
        ))}
      </div>
    </div>
  );
}

export default Comments;
