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
  const liElement = event.currentTarget.parentElement.parentElement;
  const elemName = liElement.querySelector("h2").innerHTML;
  const currentFavouriteIndex = favourites.findIndex((favourite) => {
    return favourite.name === elemName;
  });

  console.log(currentFavouriteIndex);
  if (currentFavouriteIndex !== -1) {
    const elemId = favourites[currentFavouriteIndex].id;
    const elemLi = document.getElementById(`${elemId}`); //encontrar el elemento de datalist para borrar estilos.
    if (elemLi) {
      elemLi.classList.remove("favourite-styles"); //borrar estilos de data list
    }
    favourites.splice(currentFavouriteIndex, 1); //eliminar de array de favoritos
  }

  //eliminar del listado de favoritos el elemento del click x
  favouriteList.removeChild(liElement);
  localStorage.setItem("key-favourites", JSON.stringify(favourites)); //guardar array sin el elemento borrado en localStorage
}

//REALOAD FAVOURITE LIST
function reloadFavouriteList() {
  favouriteList.innerHTML = "";
  console.log(favouriteList);
  if (favourites.length > 0) {
    favouriteList.innerHTML = "Tus favoritas";
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
    const imgElement = document.createElement("img");
    imgElement.src = favourites[i].image;
    liElement.appendChild(imgElement);
    const h2Element = document.createElement("h2");
    h2Element.innerHTML = favourites[i].name;
    liElement.appendChild(h2Element);
    const buttonElement = document.createElement("button");
    buttonElement.classList.add("x-button");
    buttonElement.type = "button";
    buttonElement.innerHTML = "X";
    h2Element.appendChild(buttonElement);

    buttonElement.addEventListener("click", removeFavouriteItem);

    favouriteList.appendChild(liElement);
  }
  console.log(favouriteList);
}

//PAINT FAVOURITE LIST
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
    console.log(favourites);
  } else {
    favourites.splice(currentFavouriteIndex, 1);
  }

  reloadFavouriteList(favourites);
  localStorage.setItem("key-favourites", JSON.stringify(favourites));
}

// GENERATE DATALIST AFTER SEARCH
function getListData(event) {
  const inputText = document.querySelector(".js-input-text").value;

  fetch(`http://api.tvmaze.com/search/shows?q=${inputText}`)
    .then((response) => response.json())
    .then((data) => {
      dataList.innerHTML = "Hemos encontrado esto:";
      for (let i = 0; i < data.length; i++) {
        const liElement = document.createElement("li");
        liElement.setAttribute("id", data[i].show.id);
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

//LOCALSTORAGE/
const savedFavourites = JSON.parse(localStorage.getItem("key-favourites"));
if (savedFavourites && savedFavourites.length > 0) {
  favourites = savedFavourites;
  reloadFavouriteList();
}

//get data cache
//JSON.stringify para convertir array a elemento string y poderlo guardar en  localStorage.
