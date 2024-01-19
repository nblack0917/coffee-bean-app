export const categoryDrinkFilter = (drinks, catName) => {
  const allDrinks = JSON.parse(JSON.stringify(drinks));
  const selectDrinks = allDrinks.filter((drink) => catName === drink.type.name);
  console.log(selectDrinks);
  return selectDrinks;
};
