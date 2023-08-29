import React from 'react';
import { Button, Input } from '../../../framework';

export function NutritionActions({ onFoodNameFilterChange, onAddFood }) {
  return (
    <form className="food-nutrition-infos-actions">
      <Input
        size="sm"
        placeholder="Food name filter"
        onChange={(event) => onFoodNameFilterChange(event.target.value)}
      />
      <Button
        size="sm"
        color="primary"
        onClick={() => { onAddFood(true); }}
      >
        Add new food
      </Button>
    </form>
  );
}
