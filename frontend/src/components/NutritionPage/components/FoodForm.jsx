import React, { useState } from 'react';
import { Input, Button, ModalDialog } from '../../../framework';
import './foodForm.css';

export function FoodForm({ open, onSubmit, onClose }) {
  const [foodName, setFoodName] = useState('');
  const [kcal, setKCal] = useState('');
  const [fat, setFat] = useState('');
  const [saturatedFat, setSaturatedFat] = useState('');
  const [carbs, setCarbs] = useState('');
  const [sugar, setSugar] = useState('');
  const [fiber, setFiber] = useState('');
  const [protein, setProtein] = useState('');

  return (
    <ModalDialog
      title="Add new food"
      actions={
            (
              <Button
                color="primary"
                type="submit"
                onClick={() => onSubmit({
                  foodName, kcal, fat, saturatedFat, carbs, sugar, fiber, protein,
                })}
              >
                Add
              </Button>
            )
        }
      open={open}
      onClose={onClose}
    >
      <div className="newfood-form-content">
        <Input type="text" label="Name" name="foodName" placeholder="Lemon Chicken" value={foodName} onChange={(event) => setFoodName(event.target.value)} />
        <Input type="number" label="KCal" name="kcal" placeholder="226" step={0.1} value={kcal} onChange={(event) => setKCal(event.target.value)} />
        <Input type="number" label="Fat" name="fat" placeholder="11.8" step={0.1} value={fat} onChange={(event) => setFat(event.target.value)} />
        <Input type="number" label="Saturated Fat" name="saturatedFat" placeholder="1.9" step={0.1} value={saturatedFat} onChange={(event) => setSaturatedFat(event.target.value)} />
        <Input type="number" label="Carbs" name="carbs" placeholder="19.1" step={0.1} value={carbs} onChange={(event) => setCarbs(event.target.value)} />
        <Input type="number" label="Sugar" name="sugar" placeholder="8.7" step={0.1} value={sugar} onChange={(event) => setSugar(event.target.value)} />
        <Input type="number" label="Fiber" name="fiber" placeholder="1.1" step={0.1} value={fiber} onChange={(event) => setFiber(event.target.value)} />
        <Input type="number" label="Protein" name="protein" placeholder="10.8" step={0.1} value={protein} onChange={(event) => setProtein(event.target.value)} />
      </div>
    </ModalDialog>
  );
}
