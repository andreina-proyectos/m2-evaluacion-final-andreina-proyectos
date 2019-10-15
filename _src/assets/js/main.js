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

        const myLiElement = createLiNewElement (myResultImage, myResultName, myResultID);
        resultList.appendChild(myLiElement);

        myLiElement.addEventListener('click', handlerClickFavorite);
      }
    });
}

function createLiNewElement (src, alt, resultID) {
  const myLiElement = document.createElement('li');
  myLiElement.classList.add('result__list__element');
  myLiElement.setAttribute('show-id', resultID);

  const myImageNewElement = document.createElement('img');
  myImageNewElement.src = src;
  myImageNewElement.alt = alt;
  myImageNewElement.classList.add('result__image');
  myLiElement.appendChild(myImageNewElement);

  const myTitleNewElement = document.createElement('h2');
  myTitleNewElement.classList.add('result__name');
  const newTitleElementContent = document.createTextNode(alt);
  myTitleNewElement.appendChild(newTitleElementContent);
  myLiElement.appendChild(myTitleNewElement);

  return myLiElement;
}

function handlerClickFavorite() {
  let liShowSelected = event.currentTarget;
  liShowSelected.classList.add('select-User-Fav');
  let showID = event.currentTarget.getAttribute('show-id');
  const favoriteObject = {
    id: showID,
    src: liShowSelected.firstChild.src,
    title: liShowSelected.lastChild.innerHTML,
  };

  const isFavorite = showFavExist(showID);
  if(!isFavorite) {
    arrFavorites.push(favoriteObject);
    printFavoriteArray ();
    localStorage.setItem('user-favorites-shows', JSON.stringify(arrFavorites));
  }
}

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
      <button class="remove-fav-element">❌</button>
      <img src="${arrFavorites[i].src}" alt="${arrFavorites[i].title}" class="favorite__image">
      <h3 class="favorite__name">${arrFavorites[i].title}</h3>
    </li>`;
  }

  const allRemoveButton = document.querySelectorAll('.remove-fav-element');
  for (let i=0; i<arrFavorites.length; i++) {
    allRemoveButton[i].addEventListener('click', handleRemoveFavorite);
  }
}

function handleRemoveFavorite () {
  const favElementToRemove = event.currentTarget;
  const liShowID = favElementToRemove.parentElement.getAttribute('data-show-id');
  for (let i=0; i<arrFavorites.length; i++) {
    if (liShowID === arrFavorites[i].id) {
      arrFavorites.splice(i,1);
      printFavoriteArray();
      localStorage.setItem('user-favorites-shows', JSON.stringify(arrFavorites));
    }
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
