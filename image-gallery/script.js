import { fakeData, fakeDataLandscape, fakeDataLandscape2, fakeDataPort, fakeDataRandom, fakeDataSquar } from "./fake-data.js";

const main = document.querySelector(".main");
const searchBtn = document.querySelector(".search-btn");
const clearBtn = document.querySelector(".clear-btn");
const searchBar = document.querySelector(".search-bar");

let lastRequest = "";

fakeData.forEach((res, index) => {
  const url = res.urls.small;

  const oldW = res.width;
  const oldH = res.height;
  const newW = 400;
  const newH = (newW * oldH) / oldW;

  const img = document.createElement("img");
  const imgContainer = document.createElement("div");
  imgContainer.className = "img-container";
  img.src = url;

  imgContainer.append(img);
  main.append(imgContainer);

  imgContainer.style.gridRowEnd = `span ${Math.ceil(newH / 10)} `;
});

searchBar.addEventListener("input", () => {
  if (searchBar.value) {
    clearBtn.classList.remove("hidden");
  } else {
    clearBtn.classList.add("hidden");
  }
});

clearBtn.addEventListener("click", () => {
  searchBar.value = "";
  clearBtn.classList.add("hidden");
});

searchBtn.addEventListener("click", () => {
  if (searchBar.value) {
    console.log("searching....");
  }
});

searchBar.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    if (searchBar.value) {
      console.log("searching....");
    }
  }
});
