document.addEventListener("DOMContentLoaded", () => {
  const recipeName = new URLSearchParams(window.location.search).get("name");
  const recipes = JSON.parse(localStorage.getItem("recipesArr") || "[]");
  const recipe = recipes.find((r) => r.name === recipeName);

  if (recipe) {
    document.getElementById("recipe-name").textContent = recipe.name;
    document.getElementById("recipe-course").textContent = recipe.course;
    document.getElementById("recipe-description").textContent =
      recipe.description;

    const tbody = document.getElementById("recipe-ingredients");
    recipe.ingredients.forEach((ing, i) => {
      if (!ing.name.trim()) return;
      tbody.innerHTML += `<tr><td>${i + 1}</td><td>${ing.name}</td><td>${ing.quantity}</td></tr>`;
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

      let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
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

