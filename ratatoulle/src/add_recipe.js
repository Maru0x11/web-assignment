//Listen to Add ingredient button so that user can add ingredients dynamically

const addIngrdBtn = document.querySelector('.btn-add');

addIngrdBtn.addEventListener("click", e=>{
  const ingrdTbody = document.querySelector('.ingredients-table').querySelector("tbody");
  //count the number of previously added trs
  let trCount = ingrdTbody.querySelectorAll("tr").length;
  trCount++;

  // create a new tr
  const newIngrdTr = ingrdTbody.appendChild(document.createElement("tr"));
  // create a new td and append a new ingredient
  const newIngrdTd = newIngrdTr.appendChild(document.createElement("td"));

  newIngrdTd.innerText =`${trCount}`;

  const newIngrdTdInputWrappper = newIngrdTr.appendChild(document.createElement("td"));

  const newIngrdInputIng = newIngrdTdInputWrappper.appendChild(document.createElement("input"));
  newIngrdInputIng.classList.add("ing_name");

   //array of placeholders so that placeholders shuffle

  const placeHolderIng = ['e.g. Flour','e.g. Salt','e.g. Butter','e.g. Eggs','e.g. Garlic'];

const randomIdx = Math.floor(Math.random() * placeHolderIng.length); // creat a random indx to shuffle

  // shuffle placeholders randomly

  newIngrdInputIng.placeholder = placeHolderIng[randomIdx];

  const newIngrdTdQtyWrapper = newIngrdTr.appendChild(document.createElement("td"));

  const newIngrdInputQty = newIngrdTdQtyWrapper.appendChild(document.createElement("input"));
  newIngrdInputQty.classList.add("ing_qty");

  //an array of placeholders so that placeholders shuffle

  const placeHolderQty = ['e.g. 50g','e.g. 2 clove','e.g. 1 tsp','e.g. 3','e.g 200g'];

  //shuffle placeholders randomly

  newIngrdInputQty.placeholder = placeHolderQty[randomIdx];

  // after everything is done show user success

  const addMsg = document.getElementById("add-message");
  addMsg.style.display = 'block';
});


// Check if there's an array existing in memory or not from localstorage

export let  recipesArr = localStorage.getItem("recipesArr");

if (recipesArr == null){
  //set the array to an empty value
  recipesArr = [];
}

else{
  //get the existing data and parse it
  recipesArr = JSON.parse(recipesArr);
}


//input validation

//an array of all possible igredients inside the table

const ingrdInput = document.querySelectorAll('[name^="ing_name"]');

// check if user hasnt't provided any ingredients
// returns false if valid and true if theres an error


let checkFormError = ()=>{
  for(let i = 0; i < ingrdInput.length; ++i){
    if(ingrdInput[i].value.trim() !=='')
      return false;
  }
  return true;
};


//Handle submit

document.querySelector('form').addEventListener("submit",e =>{
  //prevent default behaviour

  e.preventDefault();


  //validate data

  if(checkFormError()){
    document.getElementById("error-message").style.display = 'block';
    return;
  }
  //get all input data

const inputNameData = document.querySelectorAll('[name^="ing_name"]');
const inputQtyData = document.querySelectorAll('[name^="ing_qty"]');

// array of ingredients

const ingredients = [];

for(let i = 0; i < inputNameData.length; i++){
  // build an ingredient object

  const ingredient = {
    name: inputNameData[i].value,
    quantity:inputQtyData[i].value
  };

  ingredients.push(ingredient);
}

  const recipeName = document.getElementById("recipe_name").value;
  const recipeCourse = document.getElementById("course").value;
  const recipeDesc = document.getElementById("description").value;

  const recipe = {
    name: recipeName,
    course: recipeCourse,
    description: recipeDesc,
    ingredients: ingredients
  };

// push to the recipes array

recipesArr.push(recipe);

// save everyhting to localStorage

localStorage.setItem('recipesArr',JSON.stringify(recipesArr));

//Display the submit message

  document.getElementById("submit-message").style.display = 'block';
});
