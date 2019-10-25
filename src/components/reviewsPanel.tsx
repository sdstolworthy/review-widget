import * as React from "react";
import { DIReview } from "../createApp";
import ReviewBox from "./reviewBox";

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
    <div
      style={{
        columnCount: Math.floor(width / 320),
        gridGap: "1em",
        padding: "1em",
      }}
    >
      {props.reviews.map(review => {
        return <ReviewBox review={review} />;
      })}
    </div>
  );
}
