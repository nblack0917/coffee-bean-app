export const priceAdjuster = (size, price) => {
  let priceNum = price;
  if (typeof price === "string") {
    priceNum = Number(price);
  }
  const adjustments = {
    Small: 0,
    Medium: 1.25,
    Large: 2.5,
    XLarge: 3.75,
    "1/2 lb.": 0.5,
    "1 lb.": 1,
    "2 lbs.": 2,
  };

  if (size === "1/2 lb." || size === "1 lb." || size === "2 lbs.") {
    priceNum = priceNum * adjustments[size];
  } else {
    priceNum = priceNum + adjustments[size];
  }
  return priceNum;
};
