import React from "react";
import Rating from "react-rating";
import { DIReview } from "../createApp";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";

interface Props {
  review: DIReview;
}

export default function ReviewBox({ review }: Props) {
  return (
    <div
      key={review.text}
      id="review-grid"
      style={{
        boxShadow: "0 0 3px 0px #DEDEDE",
        borderRadius: "3px",
        padding: 15,
        width: "100%",
        display: "inline-block",
        marginBottom: "1em",
        border: "1px #DEDEDE solid",
        boxSizing: "border-box"
      }}
    >
      <h3 style={{ margin: "0 0 0.3em 0" }}>{review.reviewer_name}</h3>
      <Rating
        readonly={true}
        start={0}
        stop={review.rating_max}
        initialRating={review.rating}
        emptySymbol={<FontAwesomeIcon icon={faStar} color="grey" />}
        fullSymbol={<FontAwesomeIcon icon={solidStar} />}
      />
      {review.image_url ? (
        <img
          style={{ objectFit: "cover", width: "100%", margin: "1em 0" }}
          src={review.image_url}
        />
      ) : null}

      <p style={{ color: "#AAAAAA", fontSize: "0.8rem" }}>
        {moment(review.created_at).format("MM/DD/YYYY")}
      </p>
      <p>{review.text}</p>
    </div>
  );
}
