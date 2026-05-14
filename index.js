const searchBtnNode = document.querySelector('.js-btn');
const inputFieldNode = document.querySelector('.js-input');
const moviePage = document.querySelector('.js-movie-page');
const movieListBlock = document.querySelector('.js-movie-list');
const closeMoviePage = document.querySelector('.js-back__btn');



async function getDataFromRequest(filmName) {

    let response = await fetch(`https://www.omdbapi.com/?apikey=12fc66ba&t=${filmName}`);
    let filmInfo = await response.json();

    return filmInfo;
}

function renderfilmPage(data) {
    const filmTitle = data["Title"];
    const filmYear = data["Year"];
    const filmRating = data["Rated"];
    const filmDate = data["Released"];
    const filmRuntime = data["Runtime"];
    const filmGenre = data["Genre"];
    const filmDirector = data["Director"];
    const filmScenario = data["Writer"];
    const filmActors = data["Actors"];
    const filmType = data["Type"];
    const filmPoster = data["Poster"];
    const filmPlot = data["Plot"];

    document.querySelector('.js-movie__title').textContent = filmTitle;
    document.querySelector('.js-year').textContent =  filmYear;
    document.querySelector('.js-rate').textContent =  filmRating;
    document.querySelector('.js-date').textContent =  filmDate;
    document.querySelector('.js-runtime').textContent =  filmRuntime;
    document.querySelector('.js-genre').textContent =  filmGenre;
    document.querySelector('.js-director').textContent =  filmDirector;
    document.querySelector('.js-writer').textContent =  filmScenario;
    document.querySelector('.js-actors').textContent =  filmActors;
    document.querySelector('.js-movie__description').textContent =  filmPlot;
    document.querySelector('.js-movie__poster').src = filmPoster;
}

function renderFilmCard(data) {

    const filmTitle = data["Title"];
    const filmYear = data["Year"];
    const filmType = data["Type"];
    const filmPoster = data["Poster"];

    const content = ` <li class="js-movie movie">
                    <img src="${filmPoster}" alt="/" class="film__poster">
                    <div class="info-wrapper">
                        <h2 class="film__title">${filmTitle}</h2>
                        <p class="film__year">${filmYear}</p>
                        <p class="category">${filmType}</p>
                    </div>
                </li>`

    movieListBlock.innerHTML = content;

    const movieCard = document.querySelector('.js-movie');

    movieCard.addEventListener('click', function() {
        moviePage.classList.add('js-movie-page__active');
    });
}

function getFilmName() {
    const filmName = inputFieldNode.value;
    return filmName;
}

function spaceReplace(filmName) {
    let newName = '';

    for (let i = 0; i < filmName.length; i++) {
        if (filmName[i] === ' ') {
            newName += '+';
        } else {
            newName += filmName[i];
        }
    }

    return newName;
};

closeMoviePage.addEventListener('click', function() {
    moviePage.classList.remove('js-movie-page__active');
})

searchBtnNode.addEventListener('click', async function() {

        name = getFilmName();
    
        newName = spaceReplace(name);

        const data = await getDataFromRequest(newName);

        if (data.Response === 'False') {
            movieListBlock.innerHTML = `<h2 class="not-found">Фильмы не найдены</h2>`;
            return;
        }

        renderFilmCard(data);
        renderfilmPage(data);

        inputFieldNode.value = '';
}); 