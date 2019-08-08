'use strict';

//constantes y variables
const searchInput = document.querySelector('.search__input');
const searchButton = document.querySelector('.search__button');
const resultList = document.querySelector('.results__list');
const ListElement = document.querySelector('.result__list__element');
const myApi = `http://api.tvmaze.com/search/shows?q=${searchInput.value}`;



//local storage

//funciones
function handleButtonClick () {
  fetch(myapi)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      for (let i=0; i<data.length; i++) {

      }



    });
}

//listeners

searchButton.addEventListener('click', handleButtonClick);
