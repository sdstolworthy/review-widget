import React from "react";
import faker from "faker";
import Reviews from "./reviewsPanel";
import { DIReview } from "../createApp";
import moment from "moment";
import ReviewBox from "./reviewBox";

export default {
  title: "Reviews"
};

function getReview() {
  const r: DIReview = {
    analytics_id: "",
    created_at: moment().toISOString(),
    updated_at: moment().toISOString(),
    product: "",
    rating: Math.floor(Math.random() * 6),
    rating_max: 5,
    text: faker.lorem.paragraph(),
    vendor: ""
  };
  return r;
}

const reviewData = Array.apply(null, new Array(50)).map(getReview);

export const listOfReviews = () => <Reviews reviews={reviewData} />;

export const singleReview = () => <ReviewBox review={getReview()} />;
