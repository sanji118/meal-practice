//card html
/**<div class="">
                <div>
                    <img src="" alt="">
                </div>
                <div>
                    <h4 class="font-semibold text-2xl"></h4>
                    
                </div>
            </div> */

const loadCategories = () =>{
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(err => console.log('error is fetching:', err))
}
loadCategories();
const displayCategories = (categories) =>{
    categories.forEach(category =>{
        const categoryContainer = document.getElementById('categoryContainer');
        const categoryCard = document.createElement('div');
        let descriptionText = category.strCategoryDescription;
        let slicedDescription = '';
        let moreText = '';
        let seeMoreButton = '';
        if(descriptionText.length > 50){
            slicedDescription = descriptionText.slice(0, 50);
            moreText = descriptionText.slice(20);
            seeMoreButton = `<a href="#" id="seeMoreBtn" onclick="toggleText(event, this)">See More</a>`;
        }else{
            slicedDescription = descriptionText;
        }
        categoryCard.innerHTML = `
            <div>
                <img src=${category.strCategoryThumb} class ="w-fit h-full">
            </div>
            <div class="card-body w-3/4 py-auto md:p-6">
                <h4 class="card-title">${category.strCategory}</h4>
                <div>
                    <p id="description">${slicedDescription}</p>
                    ${moreText ? `<span id="dots">...</span><span id="moreText" style="display: none;">${moreText}</span>` : ''}
                    ${seeMoreButton}
                </div>
                <div  class="card-actions justify-start"><button class=" text-[#FFC107]">View Details</button></div>
            </div>
        `;
        categoryCard.classList = 'card card-side border border-[#100F0F1A] rounded-lg';
        categoryContainer.appendChild(categoryCard);
        categoryContainer.classList = 'grid grid-cols-2 gap-6 m-5 md:m-8';
    })
}

const toggleText = (event, btn) =>{
    event.preventDefault();
    const parentDiv = btn.parentElement;
    const dots = parentDiv.querySelector('#dots');
    const moreText = parentDiv.querySelector('#moreText');
    if(dots && moreText){
       if(dots.style.display === 'none'){
            dots.style.display = 'inline';
            moreText.style.display = 'none';
            btn.innerHTML = 'See More';
        }else{
            dots.style.display = 'none';
            moreText.style.display = 'inline';
            btn.innerHTML = 'See Less';
        } 
    }
    
}