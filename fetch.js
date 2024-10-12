//category create
const loadCategories = async () =>{
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const data = await res.json();
    displayAllCategories(data.categories);
}
loadCategories();
//see more see less functionality
const toggleText = (event, id)=>{
    event.preventDefault();
    const dots = document.getElementById(`dots-${id}`);
    const moreText = document.getElementById(`moreText-${id}`);
    const btnText = document.getElementById(`seeMoreBtn-${id}`)
    if(dots.style.display === 'none'){
        dots.style.display ='inline';
        moreText.style.display = 'none';
        btnText.innerText ="See more";
    }else{
        dots.style.display ='none';
        moreText.style.display = 'inline';
        btnText.innerText ="See Less";
    }
}
//details
const getDetails = async (mealId) => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    const data = await response.json();
    //displayDetails(data.meals);
};

//getDetails();
const getFoodsById = async () =>{
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await res.json();
    //displayAllFoods(data.meals);
}
//getFoodsById();


const getFoodsByFirstLetter = async (firstLetter) => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`
    );
    const data = await res.json();
    if (data.meals === null) {
      return "No data";
    }
  
    displayAllFoods(data.meals);
};


const getFoodsByCategory = async (category) => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const data = await res.json();
    if (data.meals === null) {
      return "No data";
    }
  
    displayAllFoods(data.meals);
};

//latest food
const getLatestMeal = async () => {
  const res = await fetch('https://www.themealdb.com/api/json/v1/1/latest.php');
  const data = await res.json();
  if (data.meals === null) {
    return "No data";
  }

  displayLatestMeals(data.meals);
};
getLatestMeal();