import React, { useState } from 'react';
import { FoodCard } from './components/FoodCard';
import { FoodForm } from './components/FoodForm';
import { NutritionActions } from './components/NutritionActions';
import './nutritionPage.css';

export function NutritionPage({
  foods, selectedFoods, onFoodSelect, onFoodDelete, onFoodAdd,
}) {
  const [foodNameFilter, setFoodNameFilter] = useState('');
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);

  function handleAddDialogSumbmit(newFood) {
    onFoodAdd(newFood);
    setAddDialogOpen(false);
  }

  return (
    <div className="nutrition-page">
      <NutritionActions
        onFoodNameFilterChange={setFoodNameFilter}
        onAddFood={setAddDialogOpen}
      />

      <div className="food-nutrition-infos">
        {foods
          .filter((food) => food.foodName.includes(foodNameFilter.trim()))
          .map((food) => (
            <FoodCard
              key={food.foodName}
              food={food}
              isSelected={selectedFoods.includes(food.foodName)}
              onFoodSelect={onFoodSelect}
              onFoodDelete={onFoodDelete}
            />
          ))}
      </div>

      <FoodForm
        open={isAddDialogOpen}
        onSubmit={(newFood) => handleAddDialogSumbmit(newFood)}
        onClose={() => setAddDialogOpen(false)}
      />
    </div>
  );
}
