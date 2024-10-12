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
const displayAllFoods = (meals) =>{
    const foodContainer = document.getElementById('displayAllFoods');
    foodContainer.innerHTML = '';
    meals.forEach(meal =>{
        
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
    })
}

//display latest meals
const displayLatestMeals = (meals) =>{
    meals.forEach(meal =>{
        console.log(meal);
    })
}