import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import { LikeFilled, DislikeFilled, LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import axios from "axios";

function LikeDislikes(props) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [likeAction, setLikeAction] = useState(null);
  const [dislikeAction, setDislikeAction] = useState(null);

  let variable = {};

  if (props.video) {
    variable = { videoId: props.videoId, userId: props.userId };
  } else {
    variable = { commentId: props.commentId, userId: props.userId };
  }

  useEffect(() => {
    axios.post("/api/like/getLikes", variable).then((response) => {
      if (response.data.success) {
        // How many likes received
        setLikes(response.data.likes.length);

        // If I liked
        response.data.likes.map((like) => {
          if (like.userId === props.userId) {
            setLikeAction("liked");
          }
        });
      } else {
        alert("Unable to fetch likes info");
      }
    });

    axios.post("/api/like/getDislikes", variable).then((response) => {
      if (response.data.success) {
        // How many dislikes received
        setDislikes(response.data.dislikes.length);

        // If I disliked
        response.data.likes.map((dislike) => {
          if (dislike.userId === props.userId) {
            setDislikeAction("disliked");
          }
        });
      } else {
        alert("Unable to fetch dislikes info");
      }
    });
  }, []);

  const onLike = () => {
    if (likeAction === null) {
      axios.post("/api/like/upLike", variable).then((response) => {
        if (response.data.success) {
          setLikes(likes + 1);
          setLikeAction("liked");

          if (dislikeAction !== null) {
            setDislikeAction(null);
            setDislikes(dislikes - 1);
          }
        } else {
          alert("Unable to like");
        }
      });
    } else {
      axios.post("/api/like/unLike", variable).then((response) => {
        if (response.data.success) {
          setLikes(likes - 1);
          setLikeAction(null);
        } else {
          alert("Unable to unlike");
        }
      });
    }
  };

  const onDislike = () => {
    if (dislikeAction === null) {
      axios.post("/api/like/upDislike", variable).then((response) => {
        if (response.data.success) {
          setDislikes(dislikes + 1);
          setDislikeAction("disliked");

          if (likeAction !== null) {
            setLikeAction(null);
            setLikes(likes - 1);
          }
        } else {
          alert("Unable to dislike");
        }
      });
    } else {
      axios.post("/api/like/unDislike", variable).then((response) => {
        if (response.data.success) {
          setDislikes(dislikes - 1);
          setDislikeAction(null);
        } else {
          alert("Unable to remove dislike");
        }
      });
    }
  };

  return (
    <div>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          {likeAction === "liked" ? <LikeFilled onClick={onLike} /> : <LikeOutlined onClick={onLike} />}
        </Tooltip>
      </span>
      <span style={{ paddingLeft: "8px", cursor: "auto" }}>{likes}</span>&nbsp;&nbsp;
      <span key="comment-basic-dislike">
        <Tooltip title="Like">
          {dislikeAction === "disliked" ? (
            <DislikeFilled onClick={onDislike} />
          ) : (
            <DislikeOutlined onClick={onDislike} />
          )}
        </Tooltip>
      </span>
      <span style={{ paddingLeft: "8px", cursor: "auto" }}>{dislikes}</span>&nbsp;&nbsp;
    </div>
  );
}

export default LikeDislikes;
