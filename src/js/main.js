"use strict";

//LOAD PAGE/
//get data cache
//JSON.stringify para convertir array a elemento string y poderlo guardar en  localStorage.
//REMOVE FAVORITE ITEM
function removeFavoriteItem(event) {}

//REALOAD FAVOURITE LIST
const favouriteList = document.querySelector(".js-favourite-list");
function reloadFavouriteList(favouriteItems) {
  favouriteList.innerHTML = "";
  console.log(favouriteList);
  for (let i = 0; i < favouriteItems.length; i++) {
    const liElement = document.createElement("li");
    const imgElement = document.createElement("img");
    imgElement.src = favouriteItems[i].image;
    liElement.appendChild(imgElement);
    const h2Element = document.createElement("h2");
    h2Element.innerHTML = favouriteItems[i].name;
    liElement.appendChild(h2Element);
    const buttonElement = document.createElement("button");
    buttonElement.type = "button";
    buttonElement.innerHTML = "x";
    buttonElement.addEventListener("click", removeFavoriteItem);
    liElement.appendChild(buttonElement);
    favouriteList.appendChild(liElement);
  }
  console.log(favouriteList);
}
//añadir botón con evento que haga splice y reload.

//PAINT FAVOURITE LIST

//array de objetos que tienen name y image como atributos

let favourites = [];

function selectFavourite(event) {
  event.currentTarget.classList.toggle("favourite-styles");
  const elemName = event.currentTarget.querySelector("h2").innerHTML;
  const elemImg = event.currentTarget.querySelector("img").src;
  const currentFavouriteIndex = favourites.findIndex((favourite) => {
    return favourite.name === elemName;
  });
  console.log(currentFavouriteIndex);
  if (currentFavouriteIndex === -1) {
    const favouriteObject = {
      name: elemName,
      image: elemImg,
    };
    favourites.push(favouriteObject);
    console.log(favourites);
  } else {
    favourites.splice(currentFavouriteIndex, 1);
  }

  reloadFavouriteList(favourites);
}

// GENERATE LISTDATA AFTER SEARCH

const dataList = document.querySelector(".js-data-list");
function getListData(event) {
  const inputText = document.querySelector(".js-input-text").value;

  fetch(`http://api.tvmaze.com/search/shows?q=${inputText}`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        const liElement = document.createElement("li");
        const imgElement = document.createElement("img");
        if (data[i].show.image) {
          imgElement.src = data[i].show.image.medium;
        } else {
          imgElement.src =
            "https://via.placeholder.com/210x295/ffffff/666666/?text=NO-IMAGE.";
        }
        liElement.appendChild(imgElement);
        const h2Element = document.createElement("h2");
        h2Element.innerHTML = data[i].show.name;
        liElement.appendChild(h2Element);
        dataList.appendChild(liElement);
        liElement.addEventListener("click", selectFavourite);
      }
    });
}
const buttonSearch = document.querySelector(".js-button-search");
buttonSearch.addEventListener("click", getListData);

//listener object favourite list
//paint reset button
//listener event reset button

//CLICK BUTTON SEARCH
//get API properties
//paint properties
//listener event of searched list

//CLICK SEARCHED OBJECT
//add ot take off on favourite list
//update favourite list
//change searched serie styles

//CLICK IN FAVOURITE X
//remove element of array
//update favourite list
//reverse element searched styles

//CLICK RESET BUTTON
//remove all elements of favourite list array
//update favourite list HTML
//update searching list styles//
