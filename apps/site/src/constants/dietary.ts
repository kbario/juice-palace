export const Dietary = {
  Vegan: 'Vegan',
  Vegetarian: 'Vegetarian',
  GlutenFree: 'Gluten Free',
  ContainsNuts: 'Contains Nuts',
} as const;

export type Dietary = (typeof Dietary)[keyof typeof Dietary];
