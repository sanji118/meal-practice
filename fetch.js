//category create
const loadCategories = async () =>{
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const data = await res.json();
    displayAllCategories(data.categories);
}
loadCategories();

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