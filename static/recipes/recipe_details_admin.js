document.addEventListener("DOMContentLoaded", () => {
  const id = parseInt(new URLSearchParams(window.location.search).get("id"));
  const recipes = JSON.parse(localStorage.getItem("recipesArr") || "[]");
  const recipe = recipes[id];

  if (recipe) {
    document.getElementById("detail-name").textContent = recipe.name;
    document.getElementById("detail-course").textContent = recipe.course;
    document.getElementById("detail-description").textContent = recipe.description;

    const tbody = document.getElementById("detail-ingredients");
    recipe.ingredients.forEach((ing, i) => {
      if (!ing.name.trim()) return;
      tbody.innerHTML += `<tr><td>${i + 1}</td><td>${ing.name}</td><td>${ing.quantity}</td></tr>`;
    });
  } else {
    document.querySelector(".recipe-detail-main").innerHTML =
      "<h1>Recipe not found</h1><a href='manage_recipes.html'>Back to Manage</a>";
  }
});
