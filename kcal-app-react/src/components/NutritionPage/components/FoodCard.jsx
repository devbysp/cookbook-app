import React from 'react';
import { Button, Card, Table } from '../../../framework';
import { createNutritionTableModel } from '../helpers/utils';
import './foodCard.css';

export function FoodCard({
  food, isSelected, onFoodSelect, onFoodDelete,
}) {
  const nutritionTableModel = createNutritionTableModel(food);
  const color = isSelected ? 'selected' : '';

  return (
    <Card
      header={<div className="card-title">{food.foodName}</div>}
      footer={(
        <div className="card-actions">
          <Button className="select-button" color={color} size="sm" onClick={() => onFoodSelect(food.foodName)}>
            Select
          </Button>
          <Button color="danger" size="sm" onClick={() => onFoodDelete(food)}>
            Delete
          </Button>
        </div>
    )}
    >
      <Table tableModel={nutritionTableModel} />
    </Card>
  );
}
