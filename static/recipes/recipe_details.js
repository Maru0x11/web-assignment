document.addEventListener("DOMContentLoaded", () => {
  const rawName = new URLSearchParams(window.location.search).get("name") || "";
  const recipeName = decodeURIComponent(rawName).trim();
  const recipes = JSON.parse(localStorage.getItem("recipesArr") || "[]");

  console.log("Looking for:", JSON.stringify(recipeName));
  console.log("Available names:", recipes.map((r) => JSON.stringify(r.name)));

  const recipe = recipes.find(
    (r) => r.name.trim().toLowerCase() === recipeName.toLowerCase()
  );

  if (recipe) {
    document.getElementById("recipe-name").textContent = recipe.name;
    document.getElementById("recipe-course").textContent = recipe.course;
    document.getElementById("recipe-description").textContent = recipe.description;

    const tbody = document.getElementById("recipe-ingredients");
    recipe.ingredients.forEach((ing, i) => {
      if (!ing.name.trim()) return; // skip empty rows
      const row = tbody.insertRow();
      row.insertCell().textContent = i + 1;
      row.insertCell().textContent = ing.name;
      row.insertCell().textContent = ing.quantity;
    });
  } else {
    document.querySelector(".recipe-detail-main").innerHTML =
      "<h1>Recipe not found</h1><a href='search.html'>Back to Browse</a>";
  }

  const favForm = document.getElementById("add-fav-form");
  if (favForm) {
    favForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!recipe) return;
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      if (favorites.some((f) => f.name === recipe.name)) {
        alert("This recipe is already in your favorites!");
      } else {
        favorites.push(recipe);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert("Added to Favorites!");
      }
    });
  }
});
