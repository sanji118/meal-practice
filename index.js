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
//display categories
const displayAllCategories = (categories) =>{
    categories.forEach(category =>{
        let descriptionText = category.strCategoryDescription;
        let slicedDescription = '';
        let moreText = '';
        let seeMoreButton ='';
        if(descriptionText.length > 100){
            slicedDescription = descriptionText.slice(0,100);
            moreText = descriptionText.slice(100);
            seeMoreButton =`<a id="seeMoreBtn-${category.idCategory}" onclick="toggleText(event, ${category.idCategory})" class="font-bold">See More</a>`;
        }else{
            slicedDescription = descriptionText;
        }
        const categoryContainer = document.getElementById('categoryContainer');
        const categoryCard = document.createElement('div');
        categoryCard.innerHTML=`
        <div class="card md:card-side border-base-200 border category-btn">
            <figure class="w-60">
                <img
                src=${category.strCategoryThumb}
                alt=${category.strCategory} />
            </figure>
            <div class="card-body w-80 p-4">
                <h3 class="card-title">${category.strCategory}</h3>
                <div>
                    <p id="description">${slicedDescription}</p>
                    ${moreText? `<span id="dots-${category.idCategory}">...</span><span id="moreText-${category.idCategory}" style="display: none;">${moreText}</span>` : ''}
                    ${seeMoreButton} 
                </div>
            </div>
        </div>  
        `;
        categoryContainer.classList = 'carousel rounded-box m-5 gap-5 w-full';
        categoryCard.classList ='carousel-item';
        categoryContainer.appendChild(categoryCard);
        categoryCard.onclick = () =>{
            removeActiveClass();
            categoryCard.classList.add('bg-base-200', 'rounded-lg');
            getFoodsByCategory(category.strCategory);
        }
    })
}
const removeActiveClass = () =>{
    const categoryBtn = document.getElementsByClassName('category-btn');
    for(btn of categoryBtn) {
      btn.classList.remove('bg-base-200');
    };
}
//display foods by choosing category
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
const displayAllFoods = (meals) =>{
    const foodContainer = document.getElementById('displayAllFoods');
    foodContainer.innerHTML = '';
    meals.forEach(meal =>{
        console.log(meal);
        
        const foodCard = document.createElement('div');
        const title = meal.strMeal;
        foodCard.innerHTML = `
            <figure>
                <img src="${meal.strMealThumb}" class="w-4/5"/>
            </figure>
            <div class="py-2 text-center w-3/4"><p  class="title font-bold text-lg">${title}</p></div>
            
        `;
        foodContainer.classList = 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-7 p-8'
        foodContainer.appendChild(foodCard);
        //getFoodsByCategory('beef');

    });
}

//display favourite meals
let allMeals = [];
const getFavFood = async(firstLetter) =>{
    try{
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
      const data = await res.json();
      if (data.meals) {
        allMeals = allMeals.concat(data.meals);
        displayFavFoods(allMeals);
    }
      
    }catch(err){
      console.log('error is:' , err);
    }
    
}

async function getfoodByLetter () {
    for(i=97; i <= 122; i++){
        const char = String.fromCharCode(i);
        await getFavFood(char);
    }
}
getfoodByLetter();


const displayFavFoods = (meals) =>{
    const showBtn = document.getElementById('show-all-btn');
    const favFoodContainer = document.getElementById('favFood-container');
    favFoodContainer.innerHTML= "";


    if(meals.length > 0){
        const visibleFoodCards = meals.slice(0, 6);
        const hiddenFoodCards = meals.slice(6);
        const createCard =(meal) =>{
        const {idMeal, strMeal, strMealThumb, strInstructions, strYoutube, strArea, strCategory} = meal;
        
        const foodCard = document.createElement('div');

        const strInstruction = strInstructions;
        const slicedInstruction = strInstruction.slice(0, 50) + "...";
 
            //food card div
        foodCard.innerHTML = `
            <div class="card card-side border border-base-200 h-44">
                <figure>
                    <img
                    src=${strMealThumb}
                    alt=${strMeal} class="w-44"/>
                </figure>
                <div class="card-body w-1/2 p-3">
                    <h2 class="card-title">${strMeal}</h2>
                    <p class="text-sm">${slicedInstruction}</p>
                    <div class="card-actions">
                        <button id="view-btn" onclick="getDetails(${idMeal})"><a class="text-[#FFC107]">View Details</a></button>
                    </div>
                </div>
            </div>
        `;
        favFoodContainer.classList='grid grid-cols-1 md:grid-cols-2 gap-5 p-8';

        return foodCard;
    };

    //add default showing cards
    visibleFoodCards.forEach(meal=>{
        const card = createCard(meal);
        favFoodContainer.appendChild(card);
    });
    //add hidden cards
    hiddenFoodCards.forEach(meal => {
            const card = createCard(meal);
            card.style.display = 'none';
            card.classList.add('hidden-category');
            favFoodContainer.appendChild(card);
        });
    if(hiddenFoodCards.length > 0){
        showBtn.style.display = 'inline-block';
        showBtn.innerText = "Show All";
        showBtn.onclick = toggleFoodCards;
    } else {
        showBtn.style.display = 'none';
    }

    }else{
        favFoodContainer.innerHTML = '<p>No meals Found!!!';
        showBtn.style.display = 'none';
    }
    
};
//toggle between show all and show less
const toggleFoodCards = () =>{
    const favFoodContainer = document.getElementById('favFood-container');
    const hiddenCards = favFoodContainer.querySelectorAll('.hidden-category');
    const showBtn = document.getElementById('show-all-btn');
    if (hiddenCards.length === 0) {
        console.log('No hidden cards found');
        return;
    }
    hiddenCards.forEach(card =>{
        if(card.style.display === 'none'){
            card.style.display = 'block';

        }else{
            card.style.display ='none';
        }
    });

    if(showBtn.innerText === 'Show All'){
        showBtn.innerText = 'Show less';
    }else{
        showBtn.innerText = "Show All";
    }
}



//get Details
const getDetails = async(idMeal) =>{
    try{
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
        if (res.status !== 404){
            const url = await res.json();
            displayDetails(url.meals[0]);
            if(url.meals[0] === null || url.meals[0] === undefined){
                return "No data Available!";
            }  
        }else{
            displayNoModal();
            return;
        }
        
    }catch(err){
    console.log('error is:' , err);
    }
}
//modal content create
const displayDetails = (meals) =>{
    const modalContent = document.getElementById('modal-content');

    modalContent.innerHTML = `
        <div class="card p-5">
            <h2 class="card-title p-2">${meals.strMeal}</h2>
            <div class="divider"></div>
            <figure>
                <img
                src=${meals.strMealThumb}
                alt=${meals.strMeal} />
            </figure>
            <div class="py-5 opacity-70">
                <p class="py-2"><span class="font-bold ">Category:</span> ${meals.strCategory}</p>
                <p class="py-2"><span class="font-bold">Area:</span> ${meals.strArea}</p>
                <p class="py-2"><span class="font-bold">Instructions:</span> ${meals.strInstructions}</p>
                <p><span class="font-bold">You Tube:</span> ${meals.strYoutube}</p>
            </div>
        </div>
    `;
    document.getElementById('viewDetailsModal').showModal();
};
const displayNoModal = () =>{
    const modalContent = document.getElementById('modal-content');

    modalContent.innerHTML = `
        <div><img src="https://img.icons8.com/?size=100&id=bcaSqlylrpKy&format=png&color=000000"><p class="font bold flex justify-center items-center py-5">NO DETAILS FOUND</p></div>
    `;
    document.getElementById('viewDetailsModal').showModal();
}


