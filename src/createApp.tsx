import ReactDOM from "react-dom";
import Reviews from "./components/reviewsPanel";
import * as React from "react";

declare global {
  interface Window {
    Shopify: any;
    jQuery: any;
  }
}

export interface DIProduct {
  created_at: string;
  id: string;
  name: string;
  team_id: string;
  updated_at: string;
  vendors: Array<string>;
}

export interface DIReview {
  analytics_id: string;
  created_at: string;
  product: string;
  rating?: number;
  rating_max?: number;
  text: string;
  updated_at: string;
  vendor: string;
  image_url?: string;
  reviewer_name?: string;
}

interface ICreateApp {
  shopName: string;
  getReviews: () => Promise<Array<DIReview>>;
}

export default async function createApp({ getReviews }: ICreateApp) {
  let el = document.getElementById("di-reviews");
  if (!el) {
    el = document.createElement("div");
    el.className = "di-reviews";
    const mainEls = document.getElementsByTagName("main");
    if (mainEls && mainEls.length > 0) {
      mainEls[0].append(el);
    }
  }
  ReactDOM.render(<Reviews getReviews={getReviews} />, el);
}
