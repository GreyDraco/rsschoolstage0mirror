const main = document.querySelector(".main");
const searchBtn = document.querySelector(".search-btn");
const clearBtn = document.querySelector(".clear-btn");
const searchBar = document.querySelector(".search-bar");

let lastRequest = "";

getData("random");

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
  getData(searchBar.value);
});

searchBar.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    console.log("searching....");
    getData(searchBar.value);
  }
});

async function getData(request) {
  if (request === lastRequest) {
    return;
  }
  if (request) {
    lastRequest = request;
    const url = `https://api.unsplash.com/photos/random?count=30&client_id=GRcpYRjhXlNl9WyVbfQ3rdCJTsCEyyJugwBqQYJ6kWA&query=${request}`;
    const res = await fetch(url);
    const data = await res.json();
    display(data);
  }
}

function display(data) {
  main.innerHTML = "";
  data.forEach((res) => {
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
}
