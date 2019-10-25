import React from "react";
import Rating from "react-rating";
import { DIReview } from "../createApp";
import moment from "moment";

interface Props {
  review: DIReview;
}

export default function ReviewBox({ review }: Props) {
  return (
    <div
      style={{
        boxShadow: "0 0 3px 0px #AAAAAA",
        padding: 15,
        margin: 20,
        minHeight: 100,
        minWidth: 200
      }}
    >
      <Rating
        readonly={true}
        start={0}
        stop={review.rating_max}
        initialRating={review.rating}
        // emptySymbol={<FontAwesomeIcon icon={faStar} color="grey" />}
        // fullSymbol={<FontAwesomeIcon icon={faStar} />}
      />
      <p style={{ color: "#AAAAAA", fontSize: "0.8rem" }}>
        {moment(review.created_at).format("MM/DD/YYYY")}
      </p>
      <p>{review.text}</p>
    </div>
  );
}
