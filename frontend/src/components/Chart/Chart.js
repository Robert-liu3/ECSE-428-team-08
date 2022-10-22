import React from "react";
import "./styles.css";

function iframe() {
  return {
    __html: '<iframe src="./Chart-Widget-for-Frontend.html" ></iframe>',
  };
}

export default function Charts() {
  return (
    <div class="h_iframe">
      <div dangerouslySetInnerHTML={iframe()} />
    </div>
  );
}
