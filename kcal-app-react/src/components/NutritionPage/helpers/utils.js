const FOOD_PROPS = [
  { prop: 'kcal', propName: 'KCal' },
  { prop: 'fat', propName: 'Fat' },
  { prop: 'saturatedFat', propName: 'SaturatedFat' },
  { prop: 'carbs', propName: 'Carbs' },
  { prop: 'sugar', propName: 'Sugar' },
  { prop: 'fiber', propName: 'Fiber' },
  { prop: 'protein', propName: 'Protein' },
];

export function createNutritionTableModel(food) {
  return {
    columns: [
      { name: 'Nutrient', className: 'text-col', type: 'th' },
      { name: 'Amount', className: 'number-col' },
    ],
    rows:
      FOOD_PROPS.map((foodProp) => ({
        key: foodProp.propName,
        data: [foodProp.propName, food[foodProp.prop]],
      })),

  };
}
