import React, { useState } from 'react';
import { Recipe } from './types';
import { RecipeCard } from './components/RecipeCard';
import { RecipeForm } from './components/RecipeForm';
import { RecipeDetail } from './components/RecipeDetail';
import { PlusCircle, ChefHat } from 'lucide-react';

// Sample data
const initialRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic Margherita Pizza',
    description: 'A traditional Italian pizza with fresh mozzarella, tomatoes, and basil.',
    ingredients: [
      '1 pizza dough',
      'Fresh mozzarella',
      'San Marzano tomatoes',
      'Fresh basil leaves',
      'Extra virgin olive oil',
      'Salt to taste'
    ],
    instructions: [
      'Preheat oven to 500°F (260°C) with pizza stone inside.',
      'Roll out pizza dough on a floured surface.',
      'Spread crushed tomatoes, add torn mozzarella pieces.',
      'Bake for 12-15 minutes until crust is golden.',
      'Top with fresh basil leaves and drizzle with olive oil.'
    ],
    cookingTime: 20,
    servings: 4,
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca',
    author: 'Chef Mario',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Japanese Ramen',
    description: 'Rich and flavorful ramen with tender chashu pork and ajitsuke tamago.',
    ingredients: [
      'Ramen noodles',
      'Pork belly',
      'Soy sauce',
      'Mirin',
      'Soft-boiled eggs',
      'Green onions'
    ],
    instructions: [
      'Prepare the chashu pork by braising in soy sauce and mirin.',
      'Cook ramen noodles according to package instructions.',
      'Prepare soft-boiled eggs and marinate in soy mixture.',
      'Assemble bowl with hot broth, noodles, and toppings.',
      'Garnish with green onions and nori.'
    ],
    cookingTime: 60,
    servings: 2,
    difficulty: 'Hard',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624',
    author: 'Chef Kenji',
    createdAt: new Date().toISOString(),
  }
];

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleRecipeSubmit = (formData: Omit<Recipe, 'id' | 'createdAt' | 'author'>) => {
    const newRecipe: Recipe = {
      ...formData,
      id: Date.now().toString(),
      author: 'Guest Chef',
      createdAt: new Date().toISOString(),
    };
    setRecipes(prev => [newRecipe, ...prev]);
    setShowForm(false);
  };

  if (selectedRecipe) {
    return <RecipeDetail recipe={selectedRecipe} onBack={() => setSelectedRecipe(null)} />;
  }

  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <button
            onClick={() => setShowForm(false)}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            ← Back to Recipes
          </button>
          <RecipeForm onSubmit={handleRecipeSubmit} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <ChefHat size={32} className="text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Recipe Share</h1>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircle size={20} />
            Share Recipe
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={(id) => setSelectedRecipe(recipes.find(r => r.id === id) || null)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;