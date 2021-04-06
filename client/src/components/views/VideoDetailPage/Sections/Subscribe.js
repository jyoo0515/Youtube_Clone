import axios from "axios";
import React, { useEffect, useState } from "react";

function Subscribe(props) {
  const [subscribeNumber, setSubscribeNumber] = useState(0);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let variable = { userTo: props.userTo };
    axios.post("/api/subscribe/subscribeNumber", variable).then((response) => {
      if (response.data.success) {
        setSubscribeNumber(response.data.subscribeNumber);
      } else {
        alert("Unable to get subscriber info");
      }
    });

    let subscribedVariable = { userTo: props.userTo, userFrom: localStorage.getItem("userId") };

    axios.post("/api/subscribe/subscribed", subscribedVariable).then((response) => {
      if (response.data.success) {
        setSubscribed(response.data.subscribed);
      } else {
        alert("Failed to get info");
      }
    });
  });

  const onSubscribe = () => {
    let subscribedVariable = { userTo: props.userTo, userFrom: localStorage.getItem("userId") };

    if (subscribed) {
      axios.post("/api/subscribe/unsubscribe", subscribedVariable).then((response) => {
        if (response.data.success) {
          setSubscribeNumber(subscribeNumber - 1);
          setSubscribed(!subscribed);
        } else {
          alert("Failed to unsubscribe");
        }
      });
    } else {
      axios.post("/api/subscribe/subscribe", subscribedVariable).then((response) => {
        if (response.data.success) {
          setSubscribeNumber(subscribeNumber + 1);
          setSubscribed(!subscribed);
        } else {
          alert("Failed to subscribe");
        }
      });
    }
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: `${subscribed ? "#AAAAAA" : "#CC0000"}`,
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
        }}
        onClick={onSubscribe}
      >
        {subscribeNumber} {subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
}

export default Subscribe;
