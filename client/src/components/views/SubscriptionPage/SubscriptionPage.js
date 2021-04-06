import { Card, Avatar, Col, Typography, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import moment from "moment";

const { Title } = Typography;
const { Meta } = Card;

function SubscritptionPage() {
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const subscriptionVariables = { userFrom: localStorage.getItem("userId") };
    axios.post("/api/video/getSubscriptionVideos", subscriptionVariables).then((response) => {
      if (response.data.success) {
        setVideo(response.data.videos);
      } else {
        alert("Failed to fetch videos");
      }
    });
  });

  const renderCards = video.map((vid, index) => {
    let minutes = Math.floor(vid.duration / 60);
    let seconds = Math.floor(vid.duration - minutes * 60);

    return (
      <Col lg={6} md={8} xs={24}>
        <a href={`/video/${vid._id}`}>
          <div style={{ position: "relative" }}>
            <img style={{ width: "100%" }} src={`http://localhost:5000/${vid.thumbnail}`} alt="thumbnail" />
            <div className="duration">
              <span>
                {minutes} : {seconds}
              </span>
            </div>
          </div>
        </a>
        <br />
        <Meta avatar={<Avatar src={vid.writer.image} />} title={vid.title} description="" />
        <span>{vid.writer.name}</span>
        <br />
        <span style={{ marginLeft: "3rem" }}>{vid.views} views</span> -{" "}
        <span>{moment(vid.createdAt).format("MMM Do YY")}</span>
      </Col>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}> Recommended </Title>
      <hr />
      <Row gutter={[32, 16]}>{/* {renderCards} */}</Row>
    </div>
  );
}

export default SubscritptionPage;
