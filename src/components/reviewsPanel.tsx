import * as React from "react";
import { DIReview } from "../createApp";
import ReviewBox from "./reviewBox";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  getReviews: () => Promise<Array<DIReview>>;
}

export default function Reviews(props: IProps) {
  const containerDiv = React.useRef(null);
  const [width, setWidth] = React.useState(window.innerWidth);
  const [reviews, setReviews] = React.useState<Array<DIReview>>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    function handleResize() {
      if (containerDiv.current !== null) {
        setWidth((containerDiv.current as any).clientWidth);
      }
    }
    window.addEventListener("resize", handleResize);

    props.getReviews().then(reviews => {
      setReviews(reviews);
      setIsLoading(false);
    });

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const filteredReviews = reviews.filter(
    r => typeof r.rating_max === "number" && typeof r.rating === "number"
  );
  const avgRating =
    (filteredReviews.reduce(
      (a, b) => (b.rating && b.rating_max ? a + b.rating / b.rating_max : a),
      0
    ) /
      filteredReviews.length) *
    5;

  // const onFlagReview = (hashedReview: string) => {
  //   const deleteIndex = reviews.findIndex(
  //     r => hashedReview === btoa(r.text + r.created_at)
  //   );
  //   if (deleteIndex !== null) {
  //     const newReviews = Object.assign([], reviews);
  //     newReviews.splice(deleteIndex, 1);
  //     setReviews(newReviews);
  //   }
  // };

  return (
    <div ref={containerDiv} style={{ width: "100%" }}>
      <div
        style={{
          padding: "1em",
          width: "calc(100% - 2em)",
          borderBottom: "1px #DEDEDE solid",
          display: "flex",
          alignItems: "center"
        }}
      >
        <div style={{ display: "inline-block", minWidth: "max-content" }}>
          <Rating
            readonly={true}
            start={0}
            stop={5}
            initialRating={avgRating}
            emptySymbol={
              <FontAwesomeIcon
                style={{ fontSize: "1.5rem" }}
                icon={faStar}
                color="grey"
              />
            }
            fullSymbol={
              <FontAwesomeIcon
                style={{ fontSize: "1.5rem" }}
                icon={solidStar}
              />
            }
          />
        </div>
        <h2
          style={{
            display: "inline",
            padding: 0,
            margin: 0
          }}
        >
          {isLoading ? (
            "Loading reviews"
          ) : (
            <span>&nbsp;&nbsp;{reviews.length} verified reviews</span>
          )}
        </h2>
      </div>
      <div
        style={{
          columnCount: Math.min(3, Math.floor(width / 320)),
          gridGap: "1em",
          gridRowGap: "6em",
          padding: "1em"
        }}
      >
        {reviews.map(review => {
          return (
            <ReviewBox
              key={btoa(review.text + review.created_at)}
              // handleFlag={onFlagReview}
              review={review}
            />
          );
        })}
      </div>
    </div>
  );
}
