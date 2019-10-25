import * as React from "react";
import { DIReview } from "../createApp";
import Rating from "react-rating";

interface IProps {
  reviews: Array<DIReview>;
}

export default function Reviews(props: IProps) {
  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {props.reviews.map(review => {
        return (
          <div
            style={{
              border: "1px solid #AAAAAA",
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
            />
            <p>{review.created_at}</p>
            <p>{review.text}</p>
          </div>
        );
      })}
    </div>
  );
}
