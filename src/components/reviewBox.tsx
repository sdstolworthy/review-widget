import React from "react";
import Rating from "react-rating";
import { DIReview } from "../createApp";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faFlag } from "@fortawesome/free-regular-svg-icons";
import {
  faStar as solidStar,
  faFlag as solidFlag
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  review: DIReview;
  handleFlag?: (hashedText: string) => void;
}

export default function ReviewBox({ review, handleFlag }: Props) {
  const [isClicked, setIsClicked] = React.useState(false);
  const handleClickFlag = () => {
    setIsClicked(!isClicked);
  };
  return (
    <div
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
      {handleFlag ? (
        <div
          style={{
            cursor: "pointer",
            clear: "both",
            float: "right",
            display: "inline-block"
          }}
          title="Report this review"
          onMouseDown={handleClickFlag}
          onMouseLeave={() => setIsClicked(false)}
          onMouseUp={() =>
            handleFlag && handleFlag(btoa(review.text + review.created_at))
          }
        >
          <FontAwesomeIcon icon={isClicked ? solidFlag : faFlag} />
        </div>
      ) : null}
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
