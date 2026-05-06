document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("id");
  let recipesArr = JSON.parse(localStorage.getItem("recipesArr") || "[]");

  // Load data into the form
  if (recipeId !== null && recipesArr[recipeId]) {
    const recipe = recipesArr[recipeId];
    document.getElementById("recipe_id").value = recipeId;
    document.querySelector("input[name='recipe_name']").value = recipe.name;
    document.getElementById("course").value = recipe.course;
    document.getElementById("description").value = recipe.description;

    const tbody = document.querySelector(".ingredients-table tbody");
    tbody.innerHTML = ""; // Clear default rows

    // Load existing ingredients dynamically
    recipe.ingredients.forEach((ing, index) => {
      const row = `
              <tr>
                  <td>${index + 1}</td>
                  <td><input type="text" class="ing_name" value="${ing.name}" required></td>
                  <td><input type="text" class="ing_qty" value="${ing.quantity}" required></td>
              </tr>
          `;
      tbody.insertAdjacentHTML("beforeend", row);
    });
  }

  // Save data on submit
  document.getElementById("editForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document
      .querySelector("input[name='recipe_name']")
      .value.trim();
    const course = document.getElementById("course").value;
    const desc = document.getElementById("description").value.trim();

    // Gather updated ingredients
    const ingNames = document.querySelectorAll(".ing_name");
    const ingQtys = document.querySelectorAll(".ing_qty");
    const updatedIngredients = [];

    for (let i = 0; i < ingNames.length; i++) {
      if (ingNames[i].value.trim() !== "") {
        updatedIngredients.push({
          name: ingNames[i].value.trim(),
          quantity: ingQtys[i].value.trim(),
        });
      }
    }

    if (!name || !course || !desc || updatedIngredients.length === 0) {
      alert("Please fill in all required fields and at least one ingredient.");
      return;
    }

    // Update the array and save
    recipesArr[recipeId] = {
      name: name,
      course: course,
      description: desc,
      ingredients: updatedIngredients,
    };
    localStorage.setItem("recipesArr", JSON.stringify(recipesArr));

    const banner = document.getElementById("submit-message");
    banner.style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => {
      window.location.href = "manage_recipes.html";
    }, 1500);
  });
});
