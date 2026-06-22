// Recipe object structure
class Recipe {
  constructor(name, image, title, description, time, servings, rating = 0) {
    this.name = name;
    this.image = image;
    this.title = title;
    this.description = description;
    this.time = time;
    this.servings = servings;
    this.rating = rating;
  }
}

// Create a new recipe card from user input
function createRecipeInput(recipeName, recipeImage, recipeTitle, recipeDescription, recipeTime, recipeServings, recipeRating = 0) {
  // Validate input
  if (!recipeName || !recipeImage || !recipeTitle || !recipeDescription || !recipeTime || !recipeServings) {
    console.error('Error: All recipe fields are required');
    return null;
  }

  // Create recipe object
  const recipe = new Recipe(recipeName, recipeImage, recipeTitle, recipeDescription, recipeTime, recipeServings, recipeRating);

  // Return the recipe object
  return recipe;
}

// Generate HTML from recipe data
function generateRecipeCard(recipe) {
  if (!recipe) {
    console.error('Error: Invalid recipe object');
    return null;
  }

  const recipeCard = document.createElement('div');
  recipeCard.className = 'recipe-card';
  recipeCard.innerHTML = `
    <!-- Header -->
    <div class="recipe-header">
      <h2>${recipe.name}</h2>
      <span>${recipe.rating > 0 ? '⭐'.repeat(recipe.rating) : '⭐'}</span>
    </div>

    <!-- Main Content -->
    <div class="recipe-content">
      <img src="${recipe.image}" alt="Recipe" class="recipe-image">
      <div class="recipe-info">
        <div class="recipe-title">${recipe.title}</div>
        <div class="recipe-description">
          ${recipe.description}
        </div>
        <div class="recipe-meta">
          <span>⏱️ ${recipe.time}</span>
          <span>👥 ${recipe.servings} servings</span>
        </div>
      </div>
    </div>
  `;

  return recipeCard;
}

// Add recipe card to the DOM
function addRecipeToPage(recipe, containerId = 'recipes-container') {
  const recipeCard = generateRecipeCard(recipe);
  if (!recipeCard) return;

  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Error: Container with ID "${containerId}" not found`);
    return;
  }

  container.appendChild(recipeCard);
}

// Local storage management
const STORAGE_KEY = 'userRecipes';

function saveRecipeToStorage(recipe) {
  try {
    const recipes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    recipes.push(recipe);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    console.log('Recipe saved to storage:', recipe);
    return true;
  } catch (error) {
    console.error('Error saving recipe to storage:', error);
    return false;
  }
}

function getRecipesFromStorage() {
  try {
    const recipes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    return recipes;
  } catch (error) {
    console.error('Error retrieving recipes from storage:', error);
    return [];
  }
}

function clearRecipesFromStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('Recipes cleared from storage');
    return true;
  } catch (error) {
    console.error('Error clearing recipes from storage:', error);
    return false;
  }
}

function deleteRecipeFromStorage(index) {
  try {
    const recipes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    recipes.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    console.log('Recipe deleted from storage at index:', index);
    return true;
  } catch (error) {
    console.error('Error deleting recipe from storage:', error);
    return false;
  }
}

// Complete workflow: Create and add recipe in one function
function createAndAddRecipe(recipeName, recipeImage, recipeTitle, recipeDescription, recipeTime, recipeServings, recipeRating = 0, containerId = 'recipes-container') {
  const recipe = createRecipeInput(recipeName, recipeImage, recipeTitle, recipeDescription, recipeTime, recipeServings, recipeRating);
  
  if (recipe) {
    addRecipeToPage(recipe, containerId);
    saveRecipeToStorage(recipe);
    console.log('Recipe added successfully:', recipe);
    return recipe;
  }
  
  return null;
}

// Load all recipes from storage and display them
function loadRecipesFromStorage(containerId = 'recipes-container') {
  const recipes = getRecipesFromStorage();
  
  if (recipes.length === 0) {
    console.log('No recipes found in storage');
    return;
  }

  recipes.forEach((recipeData) => {
    const recipe = new Recipe(
      recipeData.name,
      recipeData.image,
      recipeData.title,
      recipeData.description,
      recipeData.time,
      recipeData.servings,
      recipeData.rating
    );
    addRecipeToPage(recipe, containerId);
  });

  console.log(`Loaded ${recipes.length} recipes from storage`);
}


function handleRecipeFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const recipe = createAndAddRecipe(
    formData.get('recipeName'),
    formData.get('recipeImage'),
    formData.get('recipeTitle'),
    formData.get('recipeDescription'),
    formData.get('recipeTime'),
    formData.get('recipeServings'),
    parseInt(formData.get('recipeRating')) || 0
  );

  if (recipe) {
    event.target.reset();
  }
}
