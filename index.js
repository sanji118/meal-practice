//category container create
const loadCategories = () =>{
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(err => console.log('error is fetching:', err))
}
loadCategories();
const displayCategories = (categories) =>{
    const showBtn = document.getElementById('show-all-btn');
    const categoryContainer = document.getElementById('categoryContainer');
    const visibleCategories = categories.slice(0, 6);
    const hiddenCategories = categories.slice(6);
    const createCard = (category) =>{
        
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
                <img src=${category.strCategoryThumb} class ="w-fit h-full rounded-lg">
            </div>
            <div class="card-body w-3/4 py-auto md:p-6">
                <h4 class="card-title">${category.strCategory}</h4>
                <div>
                    <p id="description">${slicedDescription}</p>
                    ${moreText ? `<span id="dots">...</span><span id="moreText" style="display: none;">${moreText}</span>` : ''}
                    ${seeMoreButton}
                </div>
                <div  class="card-actions justify-start"><button id="view-details-btn" onclick="displayDetails()" class=" text-[#FFC107]">View Details</button></div>
            </div>
        `;
        categoryCard.classList = 'card card-side border border-[#100F0F1A] rounded-lg';
        categoryContainer.classList = 'grid grid-cols-2 gap-6 m-5 md:m-8';
        return categoryCard;
    }


    
    visibleCategories.forEach(category =>{
        const card = createCard(category);
        categoryContainer.appendChild(card);
    });



    if(hiddenCategories.length > 0){
        showBtn.style.display = 'inline-block';
        hiddenCategories.forEach(category =>{
            const card = createCard(category);
            card.style.display = 'none';
            card.classList.add('hidden-category');
            categoryContainer.appendChild(card);
        });
        showBtn.addEventListener('click', () => loadAllCategories(event, ))
    }else{
        showBtn.innerText = "Show less";
    }
}
//show all button dynamic
const loadAllCategories = (event, ) =>{
    event.preventDefault();
    const categoryContainer = document.getElementById('categoryContainer');
    const hiddenCards = categoryContainer.querySelectorAll('.hidden-category');
    const showBtn = document.getElementById('show-all-btn');


    hiddenCards.forEach(card =>{
        if (card.style.display === 'none') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    }); 


    if (showBtn.innerText === "Show All") {
        showBtn.innerText = "Show Less";
    } else {
        showBtn.innerText = "Show All";
    }
}
//description see more see less functionality
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

//details modal create
const loadDetails = () =>{
    fetch('www.themealdb.com/api/json/v1/1/lookup.php?i=52772')
        .then(res => res.json())
        .then(data => displayDetails(data.id))
        .catch(err => console.log('error is:', err))
}
loadDetails();
const displayDetails = (id) =>{
    console.log(id);
    const modalContent = document.getElementById('modal-content');
    const viewDetails = document.getElementById('view-details-btn');
    modalContent.innerHTML = `

    `;
    document.getElementById('viewDetailsModal').showModal()
}