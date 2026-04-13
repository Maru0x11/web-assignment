import { renderRecipes } from "./render_recipes.js";

// Listen for the Delete button on the Manage Recipes list
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-delete")) {
    e.preventDefault();
    const index = parseInt(e.target.getAttribute("data-index"));
    executeDelete(index, false);
  }
});

// Listen for the Delete button on the Admin Detail page
document.addEventListener("submit", function (e) {
  if (e.target.classList.contains("delete-recipe-form")) {
    e.preventDefault();
    const index = parseInt(e.target.querySelector(".recipe_id").value);
    executeDelete(index, true);
  }
});

// The actual delete logic
function executeDelete(index, redirect) {
  const recipesArr = JSON.parse(localStorage.getItem("recipesArr") || "[]");
  if (isNaN(index) || !recipesArr[index]) return;

  const recipeName = recipesArr[index].name;

  // CRITICAL FIX: Ensure the HTML for the modal actually exists before trying to open it!
  if (typeof ensureDeleteModal === "function") {
    ensureDeleteModal();
  }

  openDeleteModal(recipeName, function () {
    recipesArr.splice(index, 1); // Remove from array
    localStorage.setItem("recipesArr", JSON.stringify(recipesArr)); // Save to storage

    if (redirect) {
      window.location.href = "manage_recipes.html";
    } else {
      renderRecipes(); // Refresh the list automatically
    }
  });
}
