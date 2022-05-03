const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = 'ac2fb464';
const APP_key = 'bb0b5eb763835faa5f8f64e16967655d';


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
});

async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=99`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
}
function generateHTML(results) {
    container.classList.remove('initial');
    let generateHTML = '';
    results.map(result => {
        generateHTML +=

            `
       <div class="item">
        <img src="${result.recipe.image}" alt="">
        <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a class="view-button" href="${result.recipe.url}"target"_blank"=>View Recipe</a>
            <i class='bx bx-search-alt'></i>
        </div>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data">Diet Label: ${result.recipe.dietLabels}</p>
        <p class="item-data">Health Label: ${result.recipe.healthLabels}</p>
      </div>
      `



    })
    searchResultDiv.innerHTML = generateHTML;

}
