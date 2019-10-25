import ReactDOM from "react-dom";
import Reviews from "./components/reviews";
import * as React from "react";

declare global {
  interface Window {
    Shopify: any;
    jQuery: any;
  }
}

interface DIProduct {
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
  rating: number;
  rating_max: number;
  text: string;
  updated_at: string;
  vendor: string;
}

export default async function createApp() {
  if (!shopifyExists() || !hasJQuery()) {
    return;
  }
  const regexTest = /^\/products\/(.*$)/g;
  const pathName = window.location.pathname;
  if (pathName.match(regexTest)) {
    const matches = matchAll(pathName, regexTest);
    try {
      const productHandle = matches.next().value[1];
      if (productHandle) {
        const { product } = await window.jQuery.getJSON(productHandle);
        console.log("product id", product.id);
        const { results: vendorProducts } = await window.jQuery.get(
          `/apps/data_intel_reviews/products?vendor_product_id=${product.id}`
        );
        console.log(vendorProducts);
        if (
          !(
            vendorProducts &&
            Array.isArray(vendorProducts) &&
            vendorProducts.length > 0
          )
        ) {
          return;
        }
        const selectedProduct: DIProduct = vendorProducts[0];
        const {
          results: reviews
        }: { results: Array<DIReview> } = await window.jQuery.get(
          `/apps/data_intel_reviews/products/${selectedProduct.id}/reviews`
        );
        console.log(reviews);
        let el = document.getElementById("di-reviews");
        if (!el) {
          el = document.createElement("div");
          el.className = "di-reviews";
          const mainEls = document.getElementsByTagName("main");
          if (mainEls && mainEls.length > 0) {
            mainEls[0].append(el);
          }
        }
        ReactDOM.render(<Reviews reviews={reviews} />, el);
      }
    } catch (e) {}
  }
}

function* matchAll(str: string, exp: RegExp) {
  const flags = exp.global ? exp.flags : exp.flags + "g";
  const re = new RegExp(exp, flags);
  let match;
  while ((match = re.exec(str))) {
    yield match;
  }
}

function shopifyExists() {
  return !!window.Shopify;
}

function hasJQuery() {
  return !!window.jQuery;
}
