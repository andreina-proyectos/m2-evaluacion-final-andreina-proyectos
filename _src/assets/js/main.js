'use strict';

//constantes y variables
const searchInput = document.querySelector('.search__input');
const searchButton = document.querySelector('.search__button');
const resultList = document.querySelector('.results__list');
const ListElement = document.querySelector('.result__list__element');
const myFavoriteList = document.querySelector('.favorites__list');
const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT83m54gAolcMA_rV6DRKCNfP0r_M_dxZ1BBVeVJ6c-StaEz07w';
let arrFavorites = [];


//local storage
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

        //Ahora integro li dentro de ul (result list)
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
  }

  arrFavorites.push(favoriteObject);
}


//listeners
searchButton.addEventListener('click', handleButtonClick);

