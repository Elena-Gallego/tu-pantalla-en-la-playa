"use strict";

//LOAD PAGE/
//get data cache
//JSON.stringify para convertir array a elemento string y poder

//FUNCIÓN PARA RECARGAR LA LISTA DE FAVORITOS
const favouriteList = document.querySelector(".js-favourite-list");
function reloadFavouriteList(favouriteItems) {
  favouriteList.innerHTML = "";
  console.log(favouriteList);
  for (let i = 0; i < favouriteList.length; i++) {
    const liElement = document.createElement("li");
    const imgElement = document.createElement("img");
    liElement.appendChild(imgElement);
    const h2Element = document.createElement("h2");
    h2Element.innerHTML = favouriteList[i].show.name;
    liElement.appendChild(h2Element);
    dataList.appendChild(liElement);
  }
}

//LISTA QUE SE GENERA AL HACER CLICK EN EL BOTÓN SEARCH

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
      }
    });
}
const buttonSearch = document.querySelector(".js-button-search");
buttonSearch.addEventListener("click", getListData);

//paint favourite list
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
