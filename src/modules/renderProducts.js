import emptyImg from "../img/emptyImg.svg";
import { addToCart } from "./addToCart";
import { addToOrder } from "./addToOrder";

export const renderProducts = (products, selectedBrandIds) => {
  const itemsPerPage = 30;  
  let currentPage = 1;
  const productList = document.getElementById("product-list");
  const showMoreButton = document.getElementById("show-more");
  const paginationWrapper = document.querySelector(".more-cards");
  const prevPageButton = paginationWrapper.querySelector(".prev");
  const nextPageButton = paginationWrapper.querySelector(".next");

  // Фильтруем продукты по выбранным брендам
  const filteredProducts =
    selectedBrandIds.length > 0
      ? products.filter((product) =>
          selectedBrandIds.includes(product.brand_id)
        )
      : products;

  // если товаров меньше, чем должно быть отображено, скрываем пагинацию
  function hidePaginationWrapper () {
    filteredProducts.length <= itemsPerPage
    ? paginationWrapper.style.display = "none"  
    : paginationWrapper.style.display = "block";
  } 

  // получаем параметры из урла
  function getParamsFromURL() {
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page") ? parseInt(params.get("page")) : 1;
    const sort = params.get("sort") || 'price';
    const brands = params.get("brands") ? params.get("brands").split(",") : [];
    return { page, sort, brands };
  }

  // записываем параметры в урл
  function setParamsToURL(page, sort, selectedBrands) {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page);
    params.set("sort", sort);
    if (selectedBrands.length) {
      params.set("brands", selectedBrands.join(","));
    } else {
      params.delete("brands");
    }
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  }

  // отрисовываем карточки
  function displayProducts(page, filteredProducts) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // если товаров меньше, чем отображаем на странице, то отправляемся на первую страницу
    if (filteredProducts.length <= startIndex && page > 1) {
      setParamsToURL(1, getParamsFromURL().sort, getParamsFromURL().brands);
      window.location.reload();
      return;
    }

    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    productList.innerHTML = "";
    productsToShow.forEach((product) => {
      const productItem = document.createElement("div");
      productItem.innerHTML = `
        <div class="catalog__card">
            <div class="catalog__card-img">
                <img src="${product.img ? product.img : emptyImg}" alt="${product.brand_name ? product.brand_name.trim() : ""}">
            </div>
            <div class="">
            <h3 class="catalog__card-title">
              <a href="#!">${product.brand_name ? product.brand_name.trim() : "Без названия"}</a> 
            <span>${product.articul ? product.articul.trim() : ''}</span></h3>
                <ul class="catalog__card-list">
                    ${product.variants.map((variant) => 
                      `
                         <li class="catalog__card-item">
                            <h4><a href="#!">${(variant.name) ? variant.name : "Без названия"}</a></h4>
                            <span class="delivery">${variant.delivery ? variant.delivery : 0} дней</span>
                            <span class="stock">${variant.stock ? variant.stock : "Товар отсутствует"} шт.</span>
                            <span class="price">${variant.price ? variant.price : ""} ₽</span>
                            <div class="catalog__card-order">
                               <div class="catalog__card-input">
                                  <button class="catalog__card-decrement">-</button>
                                  <input type="number" min="1" max="${variant.stock}" value="1">
                                  <button class="catalog__card-increment">+</button>
                                </div>
                                <button class="catalog__card-cart">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.79134 20.2075L6.48966 3.89453H3.125M7.25268 9.22637H27.5579C28.2192 9.22637 28.6984 9.85682 28.5214 10.494L25.7099 20.6155C25.45 21.5513 24.5979 22.1989 23.6267 22.1989H10.937C9.85782 22.1989 8.9439 21.4032 8.79544 20.3343L7.25268 9.22637Z" stroke="#727271" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M12.8951 26.5296C12.8951 27.4002 12.1893 28.106 11.3186 28.106C10.448 28.106 9.74219 27.4002 9.74219 26.5296C9.74219 25.6589 10.448 24.9531 11.3186 24.9531C12.1893 24.9531 12.8951 25.6589 12.8951 26.5296Z" fill="#727271"/>
                                        <path d="M24.9008 26.5296C24.9008 27.4002 24.195 28.106 23.3243 28.106C22.4537 28.106 21.7479 27.4002 21.7479 26.5296C21.7479 25.6589 22.4537 24.9531 23.3243 24.9531C24.195 24.9531 24.9008 25.6589 24.9008 26.5296Z" fill="#727271"/>
                                    </svg>                                     
                                </button>
                            </div>
                        </li>
                        `
                      )
                      .join("")}                       
                </ul>
            </div>
        </div>      
      `;
      productList.appendChild(productItem);      
    });

    renderPagination();
    hidePaginationWrapper();
    prevPageButton.disabled = page === 1;
    nextPageButton.disabled = endIndex >= filteredProducts.length;
  }

  // рисуем пагинацию
  function renderPagination() {
    const maxVisiblePages = 5;
    const wrapper = document.querySelector(".pagination__numbers");
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startPage = Math.max(2,currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);
    wrapper.innerHTML = "";

    if (startPage > 2) {
      wrapper.classList.add("see-before");
    }
    if (endPage < totalPages - 1) {
      wrapper.classList.add("see-after");      
    };
    addPageLinkElement(1, wrapper);
    for (let i = startPage; i <= endPage; i++) {
      addPageLinkElement(i, wrapper);
    }
    addPageLinkElement(totalPages, wrapper);
  }

  // кнопки постраничной пагинации
  function addPageLinkElement(i, wrapper) {
    const pageLink = document.createElement("a");
    const params = getParamsFromURL();
    pageLink.href = `?page=${i}&sort=${params.sort}&brands=${params.brands.join(",")}`;
    pageLink.innerText = i;
    pageLink.classList.add("page-number");
    if (currentPage === i) {
      pageLink.classList.add("active");
    }
    wrapper.appendChild(pageLink);
  }

  // обновлялем страницу
  function updatePage(n) {
    const { page, sort, brands } = getParamsFromURL();
    (!n) ? currentPage = page : currentPage = page + n;
    const filteredProducts = filterProductsByBrands(products, brands);
    setParamsToURL(currentPage, sort, brands);
    displayProducts(currentPage, filteredProducts);
    addToCart();
    addToOrder();
  }

  // фильтруем по выбранным брендам
  function filterProductsByBrands(products, selectedBrands) {
    if (selectedBrands.length === 0) return products;
    return products.filter(product => selectedBrands.includes(product.brand_id.toString()));
  }

  //инициализация карточек 
  const { page, brands } = getParamsFromURL();
  currentPage = page;
  const filteredProductsArr = filterProductsByBrands(products, brands);
  displayProducts(currentPage, filteredProductsArr);
  addToCart();
  addToOrder();

  // кнопки навигации
  prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {      
      updatePage(-1);
      scrollTo(0,0)
    }
  });
  
  nextPageButton.addEventListener("click", () => {
    if (currentPage * itemsPerPage < products.length) {      
      updatePage(1);
      scrollTo(0,0)
    }
  });
  
  showMoreButton.addEventListener("click", () => {
    updatePage(1);    
  });
};
