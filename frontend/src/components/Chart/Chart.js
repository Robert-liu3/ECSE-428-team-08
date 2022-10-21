import React from "react";
function iframe() {
  return {
    __html:
      '<iframe src="./Chart-Widget-for-Frontend.html" width="1200" height="600" ></iframe>',
  };
}

export default function Charts() {
  return (
    <div>
      <div dangerouslySetInnerHTML={iframe()} />
    </div>
  );
}
