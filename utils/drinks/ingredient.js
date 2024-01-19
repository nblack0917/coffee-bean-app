const data = {
  Coffee: { icon: "coffee-maker", type: "material-community" },
  Milk: { icon: "blood-drop", type: "fontisto" },
  "Almond Milk": { icon: "blood-drop", type: "fontisto" },
  Cream: { icon: "blood-drop", type: "fontisto" },
  Syrup: { icon: "blood-drop", type: "fontisto" },
  Chocolate: { icon: "blood-drop", type: "fontisto" },
  Foam: { icon: "cloud", type: "font-awesome" },
  "Whipped Cream": { icon: "cloud", type: "font-awesome" },
  Ice: { icon: "snowflake", type: "font-awesome-5" },
  Tea: { icon: "envira", type: "font-awesome" },
  Espresso: { icon: "coffee", type: "font-awesome" },
  Matcha: { icon: "coffee", type: "font-awesome" },
  Beans: { icon: "tablets", type: "font-awesome-5" },
};
export const getIngredientIcon = (name) => {
  return data[name].icon;
};
export const getIngredientType = (name) => {
  return data[name].type;
};
