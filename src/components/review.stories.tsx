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
    reviewer_name:
      Math.floor(Math.random() * 2) % 2 === 0
        ? `${faker.name.firstName()} ${faker.name.lastName()[0]}.`
        : "",
    created_at: moment().toISOString(),
    updated_at: moment().toISOString(),
    product: "",
    rating: Math.floor(Math.random() * 6),
    rating_max: 5,
    text: faker.lorem.paragraph(),
    vendor: "",
    image_url:
      Math.floor(Math.random() * 4) % 3 === 0
        ? `https://via.placeholder.com/700x400`
        : ``
  };
  return r;
}

const reviewData = Array.apply(null, new Array(50)).map(getReview);

export const listOfReviews = () => <Reviews reviews={reviewData} />;

export const singleReview = () => <ReviewBox review={getReview()} />;
