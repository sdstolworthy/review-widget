import * as React from "react";
import { DIReview } from "../createApp";
import ReviewBox from "./review";

interface IProps {
  reviews: Array<DIReview>;
}

export default function Reviews(props: IProps) {
  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {props.reviews.map(review => {
        return <ReviewBox review={review} />;
      })}
    </div>
  );
}
