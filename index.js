const searchInput = document.getElementById("search-box");
const searchBtn = document.getElementById("search-btn");
const result = document.getElementById("result");

let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchBtn.addEventListener("click", async () => {
  try {
    if (searchInput.value === "") {
      result.innerHTML = `<h3 class="error">Please Enter Some Data</h3>`;
    } else {
      const apiData = await fetch(url + searchInput.value);
      const jsonData = await apiData.json();
      let myMeals = jsonData.meals[0];

      let count = 1;
      let ingredients = [];
      for (let i in myMeals) {
        let ingredient = "";
        let measure = "";
        if (i.startsWith("strIngredient") && myMeals[i]) {
          ingredient = myMeals[i];
          measure = myMeals["strMeasure" + count];
          count = count + 1;
          ingredients.push(`${measure} ${ingredient}`);
        }
      }

      result.innerHTML = `
        <img src=${myMeals.strMealThumb}>
        <div class="details  text-center ">
          <h2 class="fw-bold ">${myMeals.strMeal}</h2>
          <p class="fs-5">${myMeals.strArea}</p>
          <p class="fs-5">${myMeals.strCategory}</p>
          
        </div>
        <p class="ingredients"> </p>
        <div class="recipie position-absolute top-50 start-50 translate-middle">
          <button class="fa fa-close float-end m-3 hide-recipie"></button>
          <p class="recipie-details">${myMeals.strInstructions}</p>
        </div>
        <button class="  bg-transparent border-0 fs-5 float-end show-recipie">View Recipie</button>`;

      let ingredientsDet = document.querySelector(".ingredients");
      let parent = document.createElement("ul");

      ingredients.forEach((i) => {
        let child = document.createElement("li");
        child.innerText = i;
        parent.appendChild(child);
      });

      ingredientsDet.innerHTML = "";
      ingredientsDet.appendChild(parent);

      let hideRecipie = document.querySelector(".hide-recipie");
      let showRecipie = document.querySelector(".show-recipie");

      showRecipie.addEventListener("click", () => {
        document.querySelector(".recipie").style.display = "block";
      });

      hideRecipie.addEventListener("click", () => {
        document.querySelector(".recipie").style.display = "none";
      });
    }
  } catch (error) {
    result.innerHTML = `<h3 class="error">Invalid Input</h3>`;
  }
});
