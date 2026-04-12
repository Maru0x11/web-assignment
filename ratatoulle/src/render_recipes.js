/* render_recipes.js */
export function renderRecipes(data = null) {
    ensureDeleteModal();

    const container = document.getElementById('recipesList');
    container.innerHTML = '';

    const recipesToShow = data || JSON.parse(localStorage.getItem('recipesArr') || '[]');

    if (recipesToShow.length === 0) {
        container.innerHTML = '<p>No recipes found.</p>';
        return;
    }

    recipesToShow.forEach((recipe, index) => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <h3>Recipe Name: ${recipe.name}</h3>
            <p>Course: ${recipe.course}</p>
            <p>${recipe.description}</p>
            <a href="recipe_detail_admin.html?id=${index}" class="btn-card">View Details</a>
            <a href="add_recipe.html" class="btn-card">Edit</a>
            <form class="delete-recipe-form" style="display:inline;">
                <input type="hidden" class="recipe_id" value="${index}">
                <input type="submit" value="Delete">
            </form>
        `;
        container.appendChild(card);
    });
}


/* user version — no edit/delete buttons, no modal needed */
export function renderRecipesUser(data = null) {
    const container = document.getElementById('recipesList');
    container.innerHTML = '';

    const recipesToShow = data || JSON.parse(localStorage.getItem('recipesArr') || '[]');

    if (recipesToShow.length === 0) {
        container.innerHTML = '<p>No recipes found.</p>';
        return;
    }

    recipesToShow.forEach((recipe, index) => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <h3>Recipe Name: ${recipe.name}</h3>
            <p>Course: ${recipe.course}</p>
            <p>${recipe.description}</p>
            <a href="recipe_detail.html?id=${index}" class="btn-card">View Details</a>
            <button>Add to Favourites</button>
        `;
        container.appendChild(card);
    });
}
