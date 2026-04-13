document.addEventListener('DOMContentLoaded', () => {
    // 1. Get the ID from the URL (e.g., recipe_detail.html?id=0)
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');

    if (recipeId === null) return;

    // 2. Get the recipes from LocalStorage
    const recipesArr = JSON.parse(localStorage.getItem('recipesArr') || '[]');
    const recipe = recipesArr[parseInt(recipeId, 10)];

    if (recipe) {
        // 3. Inject the data into the HTML
        // We use textContent for safety to prevent XSS
        const titleElem = document.querySelector('h1');
        if (titleElem) titleElem.textContent = recipe.name;

        // Matching the structure seen in your screenshot
        const courseElem = document.querySelector('p'); 
        if (courseElem) courseElem.textContent = `Course: ${recipe.course}`;

        const ingTbody = document.querySelector('tbody');
        if (ingTbody) {
            ingTbody.innerHTML = ''; // Clear the dark placeholder row
            recipe.ingredients.forEach((ing, index) => {
                const row = `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${ing.name}</td>
                        <td>${ing.quantity}</td>
                    </tr>
                `;
                ingTbody.insertAdjacentHTML('beforeend', row);
            });
        }
    }
});