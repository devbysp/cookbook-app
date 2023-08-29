import { useEffect, useState } from 'react';
import { loadFoods, addNewFood, deleteFood } from '../api/foodApi';

export function useAppLogic() {
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    loadFoods((result) => setFoods(result));
  }, []);

  const handleFoodSelect = (selected) => {
    const withoutSelected = selectedFoods.filter((name) => name !== selected);
    if (selectedFoods.length > withoutSelected.length) {
      setSelectedFoods(withoutSelected);
    } else {
      setSelectedFoods([...selectedFoods, selected]);
    }
  };

  const handleFoodDelete = (food) => {
    deleteFood(food, () => {
      const listWithoutTheFood = foods.filter((item) => item.foodName !== food);
      setFoods(listWithoutTheFood);
    });
  };

  const handleFoodAdd = (food) => {
    addNewFood(food, () => setFoods([...foods, food]));
  };

  return {
    foods, selectedFoods, handleFoodSelect, handleFoodDelete, handleFoodAdd,
  };
}
