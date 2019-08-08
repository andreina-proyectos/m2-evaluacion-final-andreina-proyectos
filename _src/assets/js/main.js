'use strict';

//constantes y variables
const searchInput = document.querySelector('.search__input');
const searchButton = document.querySelector('.search__button');
const resultList = document.querySelector('.results__list');
const ListElement = document.querySelector('.result__list__element');
const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT83m54gAolcMA_rV6DRKCNfP0r_M_dxZ1BBVeVJ6c-StaEz07w';


//local storage
const lsUserValue = localStorage.getItem('Searched value');
if (lsUserValue) {
  searchInput.value = lsUserValue;
}

//funciones

function handleInputSearch() {
  const userValue = searchInput.value;
  if (userValue) {
    localStorage.setItem('Searched value', userValue);
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
        let myResultImage;
        let myResultName = myObject.show.name;

        if (myObject.show.image === null) {
          myResultImage = defaultImage;
        }

        else {
          myResultImage = myObject.show.image.medium;
        }

        resultList.innerHTML +=
        `<li class="result__list__element">
        <img src="${myResultImage}" alt="" class="result__image">
        <h2 class="result__name">${myResultName}</h2>
        </li>`;
      }
    });
}

//listeners
searchButton.addEventListener('click', handleButtonClick);

searchInput.addEventListener('keyup', handleInputSearch);
