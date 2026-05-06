/* search_logic.js */
import { renderRecipes } from './render_recipes.js';

renderRecipes();

const searchForm = document.querySelector('.search-container form');

if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault(); 

        // get parameters from the form
        const formData = new FormData(searchForm);
        const query = formData.get('query').toLowerCase().trim();
        const searchType = formData.get('search_type');
        const courseFilter = formData.get('course').toLowerCase();


        const allRecipes = JSON.parse(localStorage.getItem('recipesArr') || '[]');

        // filter allrecipes based on parameters
        const filteredResults = allRecipes.filter(recipe => {
            const matchesCourse = (courseFilter === "" || recipe.course.toLowerCase() === courseFilter);
            
            let matchesQuery = true;
            if (query !== "") {
                if (searchType === 'name') {
                    matchesQuery = recipe.name.toLowerCase().includes(query);
                } else if (searchType === 'ingredient') {
                    // Checks if any ingredient name matches the query
                    matchesQuery = recipe.ingredients.some(ing => 
                        ing.name.toLowerCase().includes(query)
                    );
                }
            }

            return matchesCourse && matchesQuery;
        });

        // call render recipes on the partially filtered results
        renderRecipes(filteredResults);
    });
}