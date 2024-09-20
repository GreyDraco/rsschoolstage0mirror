import { fakeData, fakeDataLandscape, fakeDataLandscape2, fakeDataPort, fakeDataRandom, fakeDataSquar } from "./fake-data.js";

const main = document.querySelector(".main");

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
