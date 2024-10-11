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
        <div class="card md:card-side border-base-200 border">
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
    })
}