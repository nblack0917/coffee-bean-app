export const priceAdjuster = (size, price, options = 0) => {
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
    priceNum = priceNum * adjustments[size] + options;
  } else {
    priceNum = priceNum + adjustments[size] + options;
  }
  return priceNum;
};

export const addCents = (price) => {
  let currPrice = price.toString();
  let checkCents = currPrice.split(".");
  let newPrice;
  if (checkCents.length > 1) {
    if (checkCents[1].length === 1) {
      newPrice = currPrice.concat("0");
    } else if (checkCents[1].length >= 3) {
      const toRemove = Number(`-${checkCents[1].length - 2}`);
      newPrice = price.toString().slice(0, toRemove);
    } else {
      newPrice = price.toString();
    }
  } else if (checkCents.length === 1) {
    newPrice = currPrice.concat(".00");
  }

  return newPrice;
};

export const addRatingDecimal = (rating) => {
  let currRating = rating.toString();
  let newRating;
  if (currRating.length === 1) {
    newRating = currRating.concat(".0");
  } else {
    newRating = currRating;
  }
  return newRating;
};
