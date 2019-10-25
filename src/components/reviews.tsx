import * as React from "react";
import { DIReview } from "../createApp";
import Rating from "react-rating";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

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
              boxShadow: '0 0 3px 0px #AAAAAA',
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
      })}
    </div>
  );
}
