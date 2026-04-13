/**
 * Admin version, includes Edit and Delete buttons.
 * Used on manage_recipes.html
 */
export function renderRecipes(data = null) {
  if (typeof ensureDeleteModal === "function") {
    ensureDeleteModal();
  }

  const container = document.getElementById("recipesList");
  if (!container) return;

  container.innerHTML = "";
  const recipesToShow =
    data || JSON.parse(localStorage.getItem("recipesArr") || "[]");

  if (recipesToShow.length === 0) {
    container.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  // NOTE: Added "index" here to know which recipe to edit/delete
  recipesToShow.forEach((recipe, index) => {
    const card = document.createElement("div");
    card.className = "recipe-card";

    card.innerHTML = `
            <h3>Recipe Name: ${recipe.name}</h3>
            <p>Course: ${recipe.course}</p>
            <p>${recipe.description}</p>
            <div style="margin-top: 10px;">
                <a href="recipe_detail_admin.html?id=${index}" class="btn-card">View Details</a>
                <a href="edit_recipe.html?id=${index}" class="btn-card" style="margin-left: 8px;">Edit Recipe</a>
                <button type="button" class="btn-delete" data-index="${index}" style="margin-left: 8px;">Delete</button>
            </div>
        `;
    container.appendChild(card);
  });
}

/**
 * User Version: No edit/delete buttons.
 * Used on search.html (Browse page)
 */
export function renderRecipesUser(data = null) {
  const container = document.getElementById("recipesList");
  if (!container) return;

  container.innerHTML = "";
  const recipesToShow =
    data || JSON.parse(localStorage.getItem("recipesArr") || "[]");

  if (recipesToShow.length === 0) {
    container.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  recipesToShow.forEach((recipe) => {
    const card = document.createElement("div");
    card.className = "recipe-card";

    // Handle single quotes in names (e.g. Grandma's Stew)
    const escapedName = recipe.name.replace(/'/g, "\\'");

    card.innerHTML = `
            <h3>Recipe Name: ${recipe.name}</h3>
            <p>Course: ${recipe.course}</p>
            <p>${recipe.description}</p>
            <a href="recipe_detail.html?name=${encodeURIComponent(recipe.name)}" class="btn-card">View Details</a>
            <button type="button" onclick="window.addToFavorites('${escapedName}')">Add to Favourites</button>
        `;
    container.appendChild(card);
  });
}

