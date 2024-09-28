import showPopup from "./showPopup.js";

const flexContainer = document.querySelector(".flex-container");
const searchBtn = document.querySelector(".search-btn");
const clearBtn = document.querySelector(".clear-btn");
const searchBar = document.querySelector(".search-bar");
const overlay = document.querySelector(".overlay");
const btnUp = document.querySelector(".btn-up");

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
  getData(searchBar.value.trim());
});

searchBar.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    getData(searchBar.value.trim());
  }
});

async function getData(request) {
  if (request === lastRequest) {
    return;
  }
  if (request) {
    lastRequest = request;
    flexContainer.innerHTML = "";
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
        flexContainer.textContent = data.errors[0];
        return;
      }
      display(data.results);
    } catch (err) {
      console.log(err);
      flexContainer.textContent = err.message;
      btnUp.classList.add("hidden");
    }
  }
}

function display(data) {
  flexContainer.innerHTML = "";
  if (data.length === 0) {
    flexContainer.textContent = "no photo found, try different keyword";
    btnUp.classList.add("hidden");
    return;
  }
  btnUp.classList.remove("hidden");
  data.forEach((res) => {
    const url = res.urls.regular;

    const oldW = res.width;
    const oldH = res.height;
    const newW = 300;
    const newH = (newW * oldH) / oldW;

    const img = document.createElement("img");
    const imgContainer = document.createElement("div");
    imgContainer.className = "img-container";
    img.src = url;
    img.addEventListener("click", () => {
      showPopup(res);
    });

    imgContainer.append(img);
    flexContainer.append(imgContainer);

    imgContainer.style.gridRowEnd = `span ${Math.ceil(newH / 10)} `;
  });
}

overlay.addEventListener("click", (event) => {
  if (!event.target.closest(".popup-container")) hidePopup();
});

function hidePopup() {
  overlay.classList.remove("overlay_active");
  document.body.classList.remove("no-scroll");
  overlay.innerHTML = "";
}

console.log(`-Вёрстка +10
на странице есть несколько фото и строка поиска +5
в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
-При загрузке приложения на странице отображаются полученные от API изображения +10
-Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API +10
-Поиск +30
при открытии приложения курсор находится в поле ввода +5
есть placeholder +5
автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5
поисковый запрос можно отправить нажатием клавиши Enter +5
после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5
в поле ввода есть крестик, при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5
-Очень высокое качество оформления приложения и/или дополнительный, не предусмотренный в задании функционал, улучшающий качество приложения +10
высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо`);

console.log(`Дополнительный функционал:
  -кнопка прокрутки на верх страницы
  -попап
  -в попапе есть ссылка на автора фото, число лайков, описание (если оно есть у исходного фото)
  -добавлена анимация пока ожидается загрузка фото
  -добавлен вывод информации при возникновении ошибки`);
