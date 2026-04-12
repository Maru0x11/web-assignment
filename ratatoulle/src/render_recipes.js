/* render_recipes.js */
export function renderRecipes() {
    // initialize modal for delete confirmation
    ensureDeleteModal();

    // find recipe list and clear it
    const container = document.getElementById('recipesList');
    container.innerHTML = '';

    const recipesArr = JSON.parse(localStorage.getItem('recipesArr') || '[]');

    if (recipesArr.length === 0) {
        container.innerHTML = '<p>No recipes found.</p>';
        return;
    }

    // loop through recipesArr and create a card for each recipe
    recipesArr.forEach((recipe, index) => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <h3>Recipe Name: ${recipe.name}</h3>
            <p>Course: ${recipe.course}</p>
            <p>${recipe.description}</p>
            <a href="recipe_detail_admin.html?id=${index}"><button>View Details</button></a>
            <a href="add_recipe.html"><button>Edit</button></a>
            <form class="delete-recipe-form" style="display:inline;">
                <input type="hidden" class="recipe_id" value="${index}">
                <input type="submit" value="Delete">
            </form>
        `;
        container.appendChild(card);
    });
}
