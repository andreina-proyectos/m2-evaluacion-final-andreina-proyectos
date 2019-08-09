'use strict';

//constantes y variables
const searchInput = document.querySelector('.search__input');
const searchButton = document.querySelector('.search__button');
const resetButton = document.querySelector ('.reset__button');
const resultList = document.querySelector('.results__list');
const myFavoriteList = document.querySelector('.favorites__list');
const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT83m54gAolcMA_rV6DRKCNfP0r_M_dxZ1BBVeVJ6c-StaEz07w';
let arrFavorites = [];

//local storage
const lsUserFavoriteShow = localStorage.getItem('user-favorites-shows');
if (lsUserFavoriteShow) {
  arrFavorites = JSON.parse(lsUserFavoriteShow);
  printFavoriteArray();
}

//funciones

function handleButtonClick () {
  const searchedValue = searchInput.value;
  const myApi = `http://api.tvmaze.com/search/shows?q=${searchedValue}`;

  fetch(myApi)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      resultList.innerHTML = '';

      for (let i=0; i<data.length; i++) {
        const myObject = data[i];

        let myResultImage;
        let myResultName = myObject.show.name;
        let myResultID = myObject.show.id;

        if (myObject.show.image === null) {
          myResultImage = defaultImage;
        }
        else {
          myResultImage = myObject.show.image.medium;
        }
        //ejecuto función fabricadora de lis
        const myLiElement = createLiNewElement (myResultImage, myResultName, myResultID);

        //Ahora integro li dentro de ul y hago que se pueda clickar (result list)
        resultList.appendChild(myLiElement);
        myLiElement.addEventListener('click', handlerClickFavorite)
      }
    });
}

//hago funcion que cree un elemento li a partir de los parametros src, alt y name
function createLiNewElement (src, alt, resultID) {
  // Ahora creo el elemento nuevo li con DOM avanzado
  const myLiElement = document.createElement('li');
  myLiElement.classList.add('result__list__element');
  myLiElement.setAttribute('show-id', resultID);

  // Ahora añado el elemento img al li
  const myImageNewElement = document.createElement('img');
  myImageNewElement.src = src;
  myImageNewElement.alt = alt;
  myImageNewElement.classList.add('result__image');
  //Ahora integro img dentro de li
  myLiElement.appendChild(myImageNewElement);
  // Ahora añado el elemento h2 que será el nombre de la serie al li
  const myTitleNewElement = document.createElement('h2');
  myTitleNewElement.classList.add('result__name');
  //escribo el contenido de mi h2
  const newTitleElementContent = document.createTextNode(alt);
  //integro el contenido de h2 en el elemento h2
  myTitleNewElement.appendChild(newTitleElementContent);

  // Integro h2 al li
  myLiElement.appendChild(myTitleNewElement);

  return myLiElement;
}

function handlerClickFavorite() {
  let liShowSelected = event.currentTarget;
  liShowSelected.classList.add('select-User-Fav');
  let showID = event.currentTarget.getAttribute('show-id');
  const favoriteObject =
  { id: showID,
    src: liShowSelected.firstChild.src,
    title: liShowSelected.lastChild.innerHTML,
  };

  //ejecucion:cuando user clickea en un li, solo se hará push en el array si ese li no es favorito, y vuelvo a pintar
  const isFavorite = showFavExist(showID);
  if(!isFavorite) {
    arrFavorites.push(favoriteObject);
    printFavoriteArray ();
    localStorage.setItem('user-favorites-shows', JSON.stringify(arrFavorites));
  }
}

// declaracion: si mi lista contiene un id igual, entonces existe y eso es true-->voy a suponer que apriori no lo tiene
function showFavExist (showID) {
  let exist = false;
  for (let i=0; i<arrFavorites.length; i++) {
    if (arrFavorites[i].id.includes(showID)) {
      exist = true;
    }
  }
  return exist;
}

function printFavoriteArray () {
  myFavoriteList.innerHTML = '';
  for (let i=0; i<arrFavorites.length; i++) {
    myFavoriteList.innerHTML +=
    `<li data-show-id="${arrFavorites[i].id}" class="favoriteElement">
      <img src="${arrFavorites[i].src}" alt="${arrFavorites[i].title}" class="favorite__image">
      <h2 class="favorite__name">${arrFavorites[i].title}</h2>
    </li>`;
  }
}

function handleResetButton () {
  arrFavorites = [];
  printFavoriteArray();
  localStorage.removeItem('user-favorites-shows');
}
//listeners
searchButton.addEventListener('click', handleButtonClick);
resetButton.addEventListener('click', handleResetButton);
