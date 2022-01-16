import React from 'react';
import { useEffect, useState } from 'react';

import image from '../comment/user-icon.png';
import CommentForm from './CommentForm';
import { ActiveCommentClass, CommentUserClass } from './Comments';

function Comment(props: {
  commentUser: CommentUserClass;
  replies: CommentUserClass[];
  backendCommentUsers: CommentUserClass[];

  currentUserId?: number;
  deleteComment: (id: number) => void;
  updateComment: (text: string, id: number) => void;
  activeComment: ActiveCommentClass | null;
  setActiveComment: (activeComment: ActiveCommentClass | null) => void;
  parentId: number;
  addComment: (text: string, parentId: number) => void;

}) {
  var commentUser = props.commentUser;
  var replies = props.replies;


  var backendCommentUsers = props.backendCommentUsers;

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
    activeComment.id === commentUser.commentDTO.id;

  var isEditing =
    activeComment &&
    activeComment.type === "editing" &&
    activeComment.id === commentUser.commentDTO.id;

  // check parentId null
  const replyId = parentId == 0 ? parentId : commentUser.commentDTO.id;
  // validate if this is null, that cannot reply
  const canReply = Boolean(currentUserId);

  

  // validate if the same user is editing the comment
  const canEdit = (currentUserId == commentUser.commentDTO.userId);


  // validate if the same user is deleting the comment
  const canDelete = currentUserId == commentUser.commentDTO.userId;

  const getReplies = (id: number) => {


    return backendCommentUsers
    .filter((backendCommentUser) => backendCommentUser.commentDTO?.parentId == id)
    .sort(
      (a: CommentUserClass, b: CommentUserClass) =>
        new Date(a.commentDTO.datePosted).getTime() - new Date(b.commentDTO.datePosted).getTime()
    );
  };

  return (
    <div className="comment">
      {/* {console.log(commentUser.commentDTO)}

      {  console.log(" parent comment id : " + replyId)}
      {console.log(" can reply comment  : " + canReply)}
      {  console.log(" can edit comment  : " + canEdit + " with current user id: " + currentUserId )}
      {  console.log("commentUser comment id: " + commentUser.commentDTO.userId )}
      {  console.log("canEdit comment : " + (commentUser.commentDTO.userId == currentUserId)  )} */}
      
      {/* TODO: image here */}
      <div className="comment-image-container">
        <img src={commentUser.userDTO.imageUrl === null ? image : commentUser.userDTO.imageUrl}
        style={{width: "48px", height: "48px", objectFit: "cover"}} />
      </div>


      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">
            {/* TODO: change to user name */}
            {commentUser.userDTO.displayName}
          </div>
          <div style={{"paddingTop": "4px"}}>{commentUser.commentDTO.datePosted}</div>
        </div>
        {!isEditing && <div className="comment-text">{commentUser.commentDTO.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={commentUser.commentDTO.body}
            handleSubmit={(text) => updateComment(text, commentUser.commentDTO.id)}
            handleCancel={() => setActiveComment(null)}
          />
        )}
        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: commentUser.commentDTO.id, type: "replying" })
              }
            >
              Reply
            </div>
          )}
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: commentUser.commentDTO.id, type: "editing" })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(commentUser.commentDTO.id)}
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
                key={reply.commentDTO.id}
                commentUser={reply}
                replies={getReplies(reply.commentDTO.id)}
                backendCommentUsers={backendCommentUsers}
                currentUserId={currentUserId}
                deleteComment={deleteComment}
                updateComment={updateComment}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                parentId={commentUser.commentDTO.id}
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
