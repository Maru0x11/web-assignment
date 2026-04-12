import { renderRecipes } from './render_recipes.js';

const recipesContainer = document.getElementById('recipesList');

if (recipesContainer) {
    recipesContainer.addEventListener('submit', function(e) {

        if (e.target.classList.contains('delete-recipe-form')) {
            e.preventDefault();

            /* Read fresh from localStorage cuz importing recipesArr from add_recipe.js doesn't work
               because add recipe js reassigns it irght after export */
            const recipesArr = JSON.parse(localStorage.getItem('recipesArr') || '[]');

            const index = parseInt(e.target.querySelector('.recipe_id').value);
            const recipeName = recipesArr[index].name;

            openDeleteModal(recipeName, function() {
                recipesArr.splice(index, 1);
                localStorage.setItem('recipesArr', JSON.stringify(recipesArr));
                if(document.querySelector('.recipe-card'))
                {
                    renderRecipes();
                }
                else
                {
                    window.location.href = 'manage-recipes.html';
                }
            });
        }
    });
}
