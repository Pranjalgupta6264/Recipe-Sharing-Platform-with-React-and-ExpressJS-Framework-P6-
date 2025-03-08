export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  image: string;
  author: string;
  createdAt: string;
}

export interface RecipeFormData extends Omit<Recipe, 'id' | 'createdAt' | 'author'> {}