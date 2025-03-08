import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { RecipeFormData } from '../types';

interface RecipeFormProps {
  onSubmit: (recipe: RecipeFormData) => void;
}

export function RecipeForm({ onSubmit }: RecipeFormProps) {
  const [formData, setFormData] = useState<RecipeFormData>({
    title: '',
    description: '',
    ingredients: [''],
    instructions: [''],
    cookingTime: 30,
    servings: 4,
    difficulty: 'Medium',
    image: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addField = (field: 'ingredients' | 'instructions') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeField = (field: 'ingredients' | 'instructions', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updateField = (field: 'ingredients' | 'instructions', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={formData.description}
            onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            value={formData.image}
            onChange={e => setFormData(prev => ({ ...prev, image: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ingredients</label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2 mt-2">
              <input
                type="text"
                value={ingredient}
                onChange={e => updateField('ingredients', index, e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => removeField('ingredients', index)}
                className="p-2 text-red-600 hover:text-red-800"
              >
                <Minus size={20} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField('ingredients')}
            className="mt-2 flex items-center gap-1 text-blue-600 hover:text-blue-800"
          >
            <Plus size={20} /> Add Ingredient
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Instructions</label>
          {formData.instructions.map((instruction, index) => (
            <div key={index} className="flex gap-2 mt-2">
              <textarea
                value={instruction}
                onChange={e => updateField('instructions', index, e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={2}
                required
              />
              <button
                type="button"
                onClick={() => removeField('instructions', index)}
                className="p-2 text-red-600 hover:text-red-800"
              >
                <Minus size={20} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField('instructions')}
            className="mt-2 flex items-center gap-1 text-blue-600 hover:text-blue-800"
          >
            <Plus size={20} /> Add Instruction
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Cooking Time (mins)</label>
            <input
              type="number"
              value={formData.cookingTime}
              onChange={e => setFormData(prev => ({ ...prev, cookingTime: parseInt(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Servings</label>
            <input
              type="number"
              value={formData.servings}
              onChange={e => setFormData(prev => ({ ...prev, servings: parseInt(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Difficulty</label>
            <select
              value={formData.difficulty}
              onChange={e => setFormData(prev => ({ ...prev, difficulty: e.target.value as RecipeFormData['difficulty'] }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Share Recipe
        </button>
      </div>
    </form>
  );
}