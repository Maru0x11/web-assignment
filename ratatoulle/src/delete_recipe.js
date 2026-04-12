import { recipesArr } from './add_recipe.js'

const recipesContainer = document.getElementById('recipesList');

if(recipesContainer) {
    rescipesContainer.addEventListener('submit', function(e) {

        if(e.target.classList.contains('delete-recipe-form')) {
            e.preventDefault();

            const indexInput = e.target.querySelector('.recipe_id');
            const index = parseInt(indexInput.value);
            const recipeName = recipesArr[index].name;

            openDeleteModal(recipeName, function() {
                recipesArr.splice(index, 1);
                localStorage.setItem('recipesArr', JSON.stringify(recipesArr));
                renderRecipes();
            });
        }
    });
}