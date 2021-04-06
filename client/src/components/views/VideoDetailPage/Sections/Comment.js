import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SingleComment } from "./SingleComment";

function Comment(props) {
  const user = useSelector((state) => state.user);
  const videoId = props.videoId;

  const [commentValue, setCommentValue] = useState("");

  const handleClick = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      content: commentValue,
      writer: user.userData._id,
      postId: videoId,
    };

    axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        setCommentValue("");
        props.refreshFunction(response.data.result);
      } else {
        alert("Failed to save comment");
      }
    });
  };

  return (
    <div>
      <br />
      <p> Replies</p>
      <hr />

      {/* Comment Lists */}

      {props.commentList &&
        props.commentList.map((comment, index) => {
          !comment.responseTo && (
            <SingleComment refreshFunction={refreshFunction} comment={comment} postId={props.postId} />
          );
        })}

      {/* Root Comment Form */}

      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <textarea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleClick}
          value={commentValue}
          placeholder="Please write a comment"
        />
        <br />
        <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Comment;
