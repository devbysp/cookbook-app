import React from 'react';
import {
  HashRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import { Navbar, Toaster, useToaster } from './framework';
import { NutritionPage } from './components/NutritionPage/NutritionPage';
import { useAppLogic } from './hooks/useAppLogic';

export default function App() {
  const { toasts } = useToaster({ timeout: 6000 });
  const {
    foods, selectedFoods, handleFoodSelect, handleFoodDelete, handleFoodAdd,
  } = useAppLogic();

  return (
    <HashRouter>
      <header>
        <Toaster inbox={toasts} />
        <Navbar
          brand="KCal Application"
          navItems={[
            { label: 'Nutrition content', link: 'nutrition' },
            { label: 'Meal plan', link: 'mealplan' },
          ]}
        />
      </header>

      <main>
        <Routes>
          <Route path="*" element={<Navigate to="nutrition" replace />} />
          <Route
            path="nutrition"
            element={
                (
                  <NutritionPage
                    foods={foods}
                    selectedFoods={selectedFoods}
                    onFoodSelect={handleFoodSelect}
                    onFoodDelete={handleFoodDelete}
                    onFoodAdd={handleFoodAdd}
                  />
                )
            }
          />
          <Route path="mealplan" element={<p>Place hodlder for meal plan</p>} />
        </Routes>
      </main>
    </HashRouter>
  );
}
