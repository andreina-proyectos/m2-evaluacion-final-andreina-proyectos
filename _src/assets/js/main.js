'use strict';

//constantes y variables
const searchInput = document.querySelector('.search__input');
const searchButton = document.querySelector('.search__button');
const resultList = document.querySelector('.results__list');
const ListElement = document.querySelector('.result__list__element');



//local storage

//funciones
function handleInputSearch() {
  const userValue = searchInput.value;
  if (userValue) {
    localStorage.setItem('Searched value', userValue)
  }
  else {
    localStorage.removeItem('Searched value');
  }
}

function handleButtonClick () {
  const searchedValue = searchInput.value;
  const myApi = `http://api.tvmaze.com/search/shows?q=${searchedValue}`;
  fetch(myApi)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      //resultList.innerHTML = '';
      for (let i=0; i<data.length; i++) {
        const  myObject = data[i];
        const myLiResult =
        `<li class="result__list__element">
        <img src="${myObject.show.image.medium}" alt="" class="result__image">
        <h2 class="result__name">${myObject.show.name}</h2>
        </li>`
      resultList.innerHTML = resultList.innerHTML + myLiResult;
      }
    });
}

//listeners
searchButton.addEventListener('click', handleButtonClick);
searchInput.addEventListener('keyup', handleInputSearch);

