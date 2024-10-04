import { Dietary } from "../constants/dietary";

export const mapDietaryToSymbol = (dietary: Dietary): string => {
  switch (dietary) {
    case Dietary.Vegan:
      return "Ⓥ";
    case Dietary.Vegetarian:
      return "V";
    case Dietary.GlutenFree:
      return "GF";
    case Dietary.ContainsNuts:
      return "CN";
    default:
      return "";
  }
};
