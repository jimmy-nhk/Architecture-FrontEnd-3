import React from "react";
import Comments, { CommentClass, ActiveCommentClass } from "./Comments";
import image from "../comment/user-icon.png";
import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";

function Comment(props: {
  comment: CommentClass;
  replies: CommentClass[];
  backendComments: CommentClass[];
  currentUserId?: number;
  deleteComment: (commentId: number) => void;
  updateComment: (text: string, commentId: number) => void;
  activeComment: ActiveCommentClass | null;
  setActiveComment: (activeComment: ActiveCommentClass | null) => void;
  parentId: number;
  addComment: (text: string, parentId: number) => void;
}) {
  var comment = props.comment;
  var replies = props.replies;
  var backendComments = props.backendComments;
  var currentUserId = props.currentUserId;
  var deleteComment = props.deleteComment;
  var activeComment = props.activeComment;
  var setActiveComment = props.setActiveComment;
  var parentId = props.parentId;
  var addComment = props.addComment;
  var updateComment = props.updateComment;
  var isReplying =
    activeComment &&
    activeComment.type === "replying" &&
    activeComment.id === comment.id;

  var isEditing =
    activeComment &&
    activeComment.type === "editing" &&
    activeComment.id === comment.id;

  // check parentId null
  const replyId = parentId == 0 ? parentId : comment.id;

  // validate if this is null, that cannot reply
  const canReply = Boolean(currentUserId);

  // validate if the same user is editing the comment
  const canEdit = currentUserId === comment.userId;

  // validate if the same user is deleting the comment
  const canDelete = currentUserId === comment.userId;

  const getReplies = (commentId: number) => {
    return backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a: CommentClass, b: CommentClass) =>
          new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime()
      );
  };

  return (
    <div className="comment">
      {console.log(comment)}
      <div className="comment-image-container">
        <img src={image} />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">
            {/* TODO: change to user name */}
            Username: {comment.userId}
          </div>
          <div style={{"paddingTop": "4px"}}>{comment.datePosted}</div>
        </div>
        {!isEditing && <div className="comment-text">{comment.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => setActiveComment(null)}
          />
        )}
        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              Reply
            </div>
          )}
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "editing" })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment.id)}
            >
              Delete
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            hasCancelButton= {false}
            initialText={""}
            handleCancel={() => setActiveComment(null)}
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
                replies={getReplies(reply.id)}
                backendComments={backendComments}
                currentUserId={currentUserId}
                deleteComment={deleteComment}
                updateComment={updateComment}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                parentId={comment.id}
                addComment={addComment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
