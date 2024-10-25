const  API_KEY = "bae97048fa0d4b828b9725e6de9fdabc";
const  url = "https://newsapi.org/v2/everything?q=";


window.addEventListener('load', () => fetchNews("India"));
function reload(){
    window.location.reload();
}

async function fetchNews(query){
    // const res = await fetch()
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data)
    bindData(data.articles);
}

function fileDataInCard(cardClone, article) {

    const newsImg = cardClone.querySelector('#news-img');
    const newsTittle = cardClone.querySelector('#news-title');
    const newsSouces = cardClone.querySelector('#news-sources');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src =article.urlToImage;
    newsTittle.innerHTML =article.title;
    newsDesc.innerHTML =article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-Us",{
        timeZone :  "Asia/Jakarta",

    });

    newsSouces.innerHTML = `${article.source.name} • ${date}`

    cardClone.firstElementChild.addEventListener('click' , ()=>{
        window.open(article.url, '_blank')
    })




}

// function bindData(articles){
//
//     const cardsContainer= document.getElementById('cards-container');
//     const NewsTemplate = document.getElementById('template-news-card');
//
//     cardsContainer.innerHTML='';
//
//     articles.forEach(article =>{
//         // if (article.urlToImage) return;
//         if (!article.urlToImage) return;
//
//
//         const cardClone =  NewsTemplate.content.cloneNode(true);
//
//         fileDataInCard(cardClone,article);
//
//         cardsContainer.appendChild(cardClone);
//     })
//
// }


function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const NewsTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = '';

    // Check if articles is undefined or null
    if (!articles) {
        // console.error('Articles array is undefined or null');
        return;
    }

    console.log('Number of articles:', articles.length); // Log number of articles

    articles.forEach(article =>{
        if (!article.urlToImage) return;

        const cardClone = NewsTemplate.content.cloneNode(true);

        fileDataInCard(cardClone, article);

        cardsContainer.appendChild(cardClone);
    })
}


let curSelectedNav = null;
function onNavIteamClick(id){

    fetchNews(id);

    const navIteam =document.getElementById(id);

    curSelectedNav?.classList.remove('active');

    curSelectedNav =navIteam;

    curSelectedNav.classList.add('active')

}

const searchButton = document.getElementById('search-button');
const searchText =  document.getElementById('search-id');


searchButton.addEventListener('click' , ()=>{

    const query = searchText.value;
    if (!query) return;
    fetchNews(query)

    curSelectedNav?.classList.remove('active');
    curSelectedNav=null;
})




