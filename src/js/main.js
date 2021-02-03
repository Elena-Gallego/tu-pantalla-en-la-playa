"use strict";

const dataList = document.querySelector(".js-data-list");
const favouriteList = document.querySelector(".js-favourite-list");

let favourites = []; //array de objetos que tienen name, image y id como atributos

//RESET FAVOURITES ARRAY
function resetFavourites(event) {
  for (let i = 0; i < favourites.length; i++) {
    const elemId = favourites[i].id;
    const elemLi = document.getElementById(`${elemId}`);
    if (elemLi) {
      elemLi.classList.remove("favourite-styles"); //quitar estilos de datalist
    }
  }
  favourites = []; //vaciar array
  reloadFavouriteList(); //recargar lista favoritos (ya vacía)
  localStorage.setItem("key-favourites", JSON.stringify(favourites));
}
//REMOVE FAVORITE ITEM
function removeFavouriteItem(event) {
  //eliminar del array el objeto
  const liElement = event.currentTarget.parentElement;
  const elemName = liElement.querySelector("h2").innerHTML;
  const currentFavouriteIndex = favourites.findIndex((favourite) => {
    return favourite.name === elemName;
  });

  console.log(currentFavouriteIndex);
  if (currentFavouriteIndex !== -1) {
    const elemId = favourites[currentFavouriteIndex].id;
    const elemLi = document.getElementById(`${elemId}`); //encontrar el elemento de datalist para borrar estilos.
    if (elemLi) {
      elemLi.classList.remove("favourite-styles"); //borrar estilos de datalist
    }
    favourites.splice(currentFavouriteIndex, 1); //eliminar de array de favoritos
  }

  //eliminar del listado de favoritos el elemento del click con botón x
  //favouriteList.removeChild(liElement);
  reloadFavouriteList();
  localStorage.setItem("key-favourites", JSON.stringify(favourites)); //guardar array sin el elemento borrado en localStorage
}

//RELOAD FAVOURITE LIST
function reloadFavouriteList() {
  favouriteList.innerHTML = "";
  console.log(favouriteList);
  if (favourites.length > 0) {
    favouriteList.innerHTML = "Favoritas";

    const liButtonElem = document.createElement("li");
    const resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.innerHTML = "Reset All";
    resetButton.classList.add("reset-button");
    liButtonElem.appendChild(resetButton);
    favouriteList.appendChild(liButtonElem);
    resetButton.addEventListener("click", resetFavourites);
  }
  for (let i = 0; i < favourites.length; i++) {
    const liElement = document.createElement("li");
    const buttonElement = document.createElement("button");
    buttonElement.classList.add("x-button");
    buttonElement.type = "button";
    buttonElement.innerHTML = "X";
    liElement.appendChild(buttonElement);
    const imgElement = document.createElement("img");
    imgElement.src = favourites[i].image;
    liElement.appendChild(imgElement);
    const h2Element = document.createElement("h2");
    h2Element.innerHTML = favourites[i].name;
    liElement.appendChild(h2Element);

    buttonElement.addEventListener("click", removeFavouriteItem);

    favouriteList.appendChild(liElement);
  }
  console.log(favouriteList);
}

//CREATE FAVOURITE ARRAY
function selectFavourite(event) {
  event.currentTarget.classList.toggle("favourite-styles");
  const elemName = event.currentTarget.querySelector("h2").innerHTML;
  const elemImg = event.currentTarget.querySelector("img").src;
  const elemId = event.currentTarget.getAttribute("id");
  const currentFavouriteIndex = favourites.findIndex((favourite) => {
    return favourite.name === elemName;
  });
  console.log(currentFavouriteIndex);
  if (currentFavouriteIndex === -1) {
    const favouriteObject = {
      name: elemName,
      image: elemImg,
      id: elemId,
    };
    favourites.push(favouriteObject);
  } else {
    favourites.splice(currentFavouriteIndex, 1);
  }

  reloadFavouriteList(favourites);
  localStorage.setItem("key-favourites", JSON.stringify(favourites));
}

//GENERATE DATALIST AFTER SEARCH
function getListData(event) {
  const inputText = document.querySelector(".js-input-text").value;

  fetch(`https://api.tvmaze.com/search/shows?q=${inputText}`)
    .then((response) => response.json())
    .then((data) => {
      dataList.innerHTML = "Elige una serie:";
      for (let i = 0; i < data.length; i++) {
        //li
        const liElement = document.createElement("li");
        liElement.setAttribute("id", data[i].show.id);
        //img
        const imgElement = document.createElement("img");
        if (data[i].show.image) {
          imgElement.src = data[i].show.image.medium;
        } else {
          imgElement.src =
            "https://via.placeholder.com/210x295/ffffff/666666/?text=NO-IMAGE.";
        }
        liElement.appendChild(imgElement);

        //h2
        const h2Element = document.createElement("h2");
        h2Element.innerHTML = data[i].show.name;
        liElement.appendChild(h2Element);

        //añado li a datalist. Aquí se pinta.
        dataList.appendChild(liElement);
        liElement.addEventListener("click", selectFavourite);
      }
    });
}
const buttonSearch = document.querySelector(".js-button-search");
buttonSearch.addEventListener("click", getListData);
const inputSearch = document.querySelector(".js-input-text");
inputSearch.addEventListener("keydown", function (event){
  if (event.key === 'Enter') {  //checks whether the pressed key is "Enter"
    getListData(event);
  }
});



//LOCALSTORAGE LECTURA/
const savedFavourites = JSON.parse(localStorage.getItem("key-favourites"));
if (savedFavourites && savedFavourites.length > 0) {
  favourites = savedFavourites;
  reloadFavouriteList();
}
