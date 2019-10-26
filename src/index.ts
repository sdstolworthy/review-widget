import createApp, { DIReview } from "./createApp";


(async function (Shopify: any, jQuery: any) {
  console.log("loaded di script");
  if (!Shopify || !jQuery) {
    return;
  }

  const regexTest = /^\/products\/(.*$)/g;
  const pathName = window.location.pathname;
  if (pathName.match(regexTest)) {
    const matches = matchAll(pathName, regexTest);
    const productHandle = matches.next().value[1];
    const getReviews = async () => {
      if (productHandle) {
        try {
          const { product: shopifyProduct } = await jQuery.getJSON(productHandle);
          const product = await jQuery.get(
            `/apps/data_intel_reviews/products/${shopifyProduct.id}`
          );
          const reviews: Array<DIReview> = await jQuery.get(
            `/apps/data_intel_reviews/products/${product.id}/reviews`
          );

          return reviews
        } catch (e) {
          console.error('Something went wrong initializing data intel')
        }
      }
      return []
    }
    createApp({ shopName: Shopify.shop, getReviews });

  }
})(window.Shopify, window.jQuery)

function* matchAll(str: string, exp: RegExp) {
  const flags = exp.global ? exp.flags : exp.flags + "g";
  const re = new RegExp(exp, flags);
  let match;
  while ((match = re.exec(str))) {
    yield match;
  }
}