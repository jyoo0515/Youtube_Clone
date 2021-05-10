import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import axios from "axios";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";
import Comment from "./Sections/Comment";
import LikeDislikes from "./Sections/LikeDislikes";

function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  const variable = { videoId: videoId };

  const [videoDetail, setVideoDetail] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.post("api/video/getVideoDetail", variable).then((response) => {
      if (response.data.success) {
        setVideoDetail(response.data.videoDetail);
      } else {
        alert("Failed to get video info.");
      }
    });

    axios.post("api/comment/getComments", variable).then((response) => {
      if (response.data.success) {
        setComments(response.data.comments);
      } else {
        alert("Failed to get comment data");
      }
    });
  }, []);

  const refreshFunction = (newComment) => {
    setComments(comments.concat(newComment));
  };

  if (videoDetail.writer) {
    const subscribeButton = videoDetail.writer._id !== localStorage.getItem("userId") && (
      <Subscribe userTo={videoDetail.writer._id} />
    );

    return (
      <div>
        <Row gutter={[16, 16]}>
          <Col lg={18} xs={24}>
            <div style={{ width: "100%", padding: "3rem 4rem" }}>
              <video style={{ width: "100%" }} src={`http://localhost:5000/${videoDetail.filePath}`} controls />

              <List.Item
                actions={[<LikeDislikes userId={localStorage.getItem("userId")} videoId={videoId} />, subscribeButton]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={videoDetail.writer.image} />}
                  title={videoDetail.writer.name}
                  description={videoDetail.description}
                />
              </List.Item>

              {/* Comments */}
              <Comment refreshFunction={refreshFunction} commentList={comments} postId={videoId} />
            </div>
          </Col>
          <Col lg={6} xs={24}>
            <SideVideo />
          </Col>
        </Row>
      </div>
    );
  } else {
    return <div>...loading</div>;
  }
}

export default VideoDetailPage;
