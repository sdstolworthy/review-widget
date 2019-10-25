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
      key={review.text}
      id="review-grid"
      style={{
        boxShadow: "0 0 3px 0px #AAAAAA",
        padding: 15,
        width: "100%",
        display: "inline-block",
        boxSizing: "border-box",
        marginBottom: "1em"
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
