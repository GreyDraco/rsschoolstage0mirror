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
    getData(searchBar.value);
  }
});

async function getData(request) {
  if (request === lastRequest) {
    return;
  }
  if (request) {
    lastRequest = request;
    main.innerHTML = "";
    const url = `https://api.unsplash.com/search/photos?page=1&per_page=30&query=${encodeURIComponent(request)}&client_id=GRcpYRjhXlNl9WyVbfQ3rdCJTsCEyyJugwBqQYJ6kWA`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        if (res.status === 403) {
          throw new Error(`Request limit exceeded, try again later`);
        } else throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (data.errors) {
        main.textContent = data.errors[0];
        return;
      }
      display(data.results);
    } catch (err) {
      console.log(err);
      main.textContent = err.message;
    }
  }
}

function display(data) {
  main.innerHTML = "";
  if (data.length === 0) {
    main.textContent = "no photo found, try different keyword";
  }
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
