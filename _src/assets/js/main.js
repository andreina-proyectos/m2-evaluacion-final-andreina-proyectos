'use strict';

//constantes y variables
const searchInput = document.querySelector('.search__input');
const searchButton = document.querySelector('.search__button');
const resultList = document.querySelector('.results__list');
const ListElement = document.querySelector('.result__list__element');
const defaultImage = 'https://img.icons8.com/cotton/2x/cinema-.png';



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
      resultList.innerHTML = '';
      for (let i=0; i<data.length; i++) {
        const myObject = data[i];
        const myResultImage = '';
        const myResultName = myObject.show.name;
        const myLiResult =
          `<li class="result__list__element">
          <img src="${myResultImage.medium}" alt="" class="result__image">
          <h2 class="result__name">${myResultName}</h2>
          </li>`;


        if (myResultImage === null) {
          myResultImage.src = defaultImage;
          resultList.innerHTML += myLiResult;
        }

        else {
          myResultImage.src = myResultImage.medium;
          resultList.innerHTML += myLiResult;
        }
      }
    });
}

//listeners
searchButton.addEventListener('click', handleButtonClick);
searchInput.addEventListener('keyup', handleInputSearch);
