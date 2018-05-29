import React from "react";
import ReactLoading from 'react-loading';
export default function Loading() {
  return (
    <div className="container loadingDiv ">
      {" "}
      <ReactLoading type="spin" color="gray" height={200} width={200} />{" "}
    </div>
  );
}
