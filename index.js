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
  const recipe = new Recipe(recipeName, recipeImage, recipeTitle, recipeDescription, recipeTime, recipeServings, recipeRating);
  return recipe;
}


function generateRecipeCard(recipe) {
  if (!recipe) {
    console.error('Error: Invalid recipe object');
    return null;
  }

  const recipeCard = document.createElement('div');
  recipeCard.className = 'recipe-card';
  recipeCard.innerHTML = `
    <div class="recipe-header">
      <h2>${recipe.name}</h2>
      <span>${recipe.rating > 0 ? '⭐'.repeat(recipe.rating) : '⭐'}</span>
    </div>
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

// Complete workflow: Create and add recipe in one function
function createAndAddRecipe(recipeName, recipeImage, recipeTitle, recipeDescription, recipeTime, recipeServings, recipeRating = 0, containerId = 'recipes-container') {
  const recipe = createRecipeInput(recipeName, recipeImage, recipeTitle, recipeDescription, recipeTime, recipeServings, recipeRating);
  
  if (recipe) {
    addRecipeToPage(recipe, containerId);
    console.log('Recipe added successfully:', recipe);
    return recipe;
  }
  
  return null;
}