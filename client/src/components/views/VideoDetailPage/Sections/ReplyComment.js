import React, { useEffect, useState } from "react";
import { SingleComment } from "./SingleComment";

function ReplyComment(props) {
  const [childCommentNumber, setChildCommentNumber] = useState(0);
  const [openReplyComments, setOpenReplyComments] = useState(false);

  useEffect(() => {
    let commentNumber = 0;
    props.commentList.map((comment, index) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
  }, [props.commentList]);

  const renderReplyComment = (parentCommentId) => {
    props.commentList.map((comment, index) => {
      <React.Fragment>
        {comment.responseTo === parentCommentId && (
          <div style={{ width: "80%", marginLeft: "40px" }}>
            <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={props.postId} />
            <ReplyComment
              refreshFunction={props.refreshFunction}
              commentList={props.commentList}
              postId={props.postId}
            />
          </div>
        )}
      </React.Fragment>;
    });
  };

  const onHandleChange = () => {
    setOpenReplyComments(!openReplyComments);
  };

  return (
    <div>
      {childCommentNumber > 0 && (
        <p style={{ fontSize: "14px", margin: 0, color: "gray" }} onClick={onHandleChange}>
          View {childCommentNumber} more comment(s)
        </p>
      )}

      {openReplyComments && renderReplyComment(props.parentCommentId)}
    </div>
  );
}

export default ReplyComment;
