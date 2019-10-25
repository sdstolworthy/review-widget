import * as React from "react";
import { DIReview } from "../createApp";
import ReviewBox from "./reviewBox";
import Rating from "react-rating";

interface IProps {
  reviews: Array<DIReview>;
}

export default function Reviews(props: IProps) {
  const [width, setWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          padding: "1em",
          width: "calc(100% - 2em)",
          borderBottom: "1px #DEDEDE solid",
          display: "flex",
          alignItems: "center"
        }}
      >
        <div style={{ display: "inline-block" }}>
          <Rating
            readonly={true}
            initialRating={
              (props.reviews
                .filter(r => typeof r.rating_max === "number" && r.rating)
                .reduce((a, b) => a + b.rating / b.rating_max, 0) /
                props.reviews.length) *
              5
            }
            stop={5}
            start={0}
          />
        </div>
        <h2
          style={{
            display: "inline",
            textAlign: "center",
            verticalAlign: "middle"
          }}
        >
          &nbsp;&nbsp;{props.reviews.length} reviews
        </h2>
      </div>
      <div
        style={{
          columnCount: Math.floor(width / 320),
          gridGap: "1em",
          padding: "1em"
        }}
      >
        {props.reviews.map(review => {
          return <ReviewBox review={review} />;
        })}
      </div>
    </div>
  );
}
