export let recipesArr = JSON.parse(localStorage.getItem("recipesArr")) || [];

const addIngrdBtn = document.querySelector('.btn-add');

addIngrdBtn.addEventListener("click", () => {
    const table = document.getElementById('ingredients-table');
    const emptyState = document.getElementById('empty-state');
    const ingrdTbody = table.querySelector('tbody');
    const trCount = ingrdTbody.querySelectorAll("tr").length + 1;

    const placeHolderIng = ['e.g. Flour', 'e.g. Salt', 'e.g. Butter', 'e.g. Eggs', 'e.g. Garlic'];
    const placeHolderQty = ['e.g. 50g', 'e.g. 2 clove', 'e.g. 1 tsp', 'e.g. 3', 'e.g 200g'];
    const randomIdx = Math.floor(Math.random() * placeHolderIng.length);

    ingrdTbody.innerHTML += `
        <tr>
            <td>${trCount}</td>
            <td><input type="text" name="ing_name" class="ing_name" placeholder="${placeHolderIng[randomIdx]}"></td>
            <td><input type="text" name="ing_qty" class="ing_qty" placeholder="${placeHolderQty[randomIdx]}"></td>
        </tr>
    `;

    table.classList.remove('hidden');
    emptyState.classList.add('hidden');
    document.getElementById("add-message").style.display = 'block';
});

const checkFormError = () => {
    const ingrdInput = document.querySelectorAll('[name^="ing_name"]');
    return ![...ingrdInput].some(input => input.value.trim() !== '');
};

document.querySelector('form').addEventListener("submit", (e) => {
    e.preventDefault();

    if (checkFormError()) {
        document.getElementById("error-message").style.display = 'block';
        return;
    }

    const inputNameData = document.querySelectorAll('[name^="ing_name"]');
    const inputQtyData = document.querySelectorAll('[name^="ing_qty"]');

    const ingredients = [...inputNameData].map((input, i) => ({
        name: input.value,
        quantity: inputQtyData[i].value
    }));

    const recipe = {
        name: document.getElementById("recipe_name").value,
        course: document.getElementById("course").value,
        description: document.getElementById("description").value,
        ingredients: ingredients
    };

    recipesArr.push(recipe);
    localStorage.setItem('recipesArr', JSON.stringify(recipesArr));
    window.location.href = 'manage_recipes.html';
});
