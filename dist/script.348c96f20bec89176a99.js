/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/customSelect.js":
/*!*************************************!*\
  !*** ./src/modules/customSelect.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   customSelect: () => (/* binding */ customSelect)
/* harmony export */ });
const customSelect = () => {
  const selects = document.querySelectorAll('.select');
  const arr = ['Сначала дешевые', 'Сначала дорогие', 'Сначала большее количество', 'Быстрая доставка'];
  if (selects.length > 0) {
    selects.forEach(select => {
      let selectValues = arr;
      const selectedOption = select.querySelector('.select__title');
      const optionsList = select.querySelector('.select__list ul');
      function openSelect() {
        select.classList.add('active');
        select.style.maxHeight = selectedOption.offsetHeight + optionsList.offsetHeight + 'px';
      }
      function closeSelect() {
        select.classList.remove('active');
        select.style.maxHeight = '40px';
      }
      function renderOptions() {
        let optionsElements = '';
        for (let i = 1; i < arr.length; i++) {
          optionsElements += `<li><button class="select__item" data-value="1">${selectValues[i]}</button></li>`;
        }
        optionsList.innerHTML = optionsElements;
      }
      selectedOption.innerText = selectValues[0];
      select.style.maxHeight = '40px';
      renderOptions();
      selectedOption.addEventListener('click', () => {
        select.classList.contains('active') ? closeSelect() : openSelect();
      });
      document.addEventListener('click', e => {
        if (!select.contains(e.target)) {
          closeSelect();
        }
      });
      const options = select.querySelectorAll('.select__item');
      options.forEach((option, index) => {
        option.addEventListener('click', () => {
          const value = selectValues.splice(index + 1, 1)[0];
          selectValues.unshift(value);
          selectedOption.innerText = selectValues[0];
          closeSelect();
        });
      });
    });
  }
};

/***/ }),

/***/ "./src/modules/filtersList.js":
/*!************************************!*\
  !*** ./src/modules/filtersList.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderFilters: () => (/* binding */ renderFilters)
/* harmony export */ });
/* harmony import */ var _brands_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./brands.json */ "./src/modules/brands.json");

const renderFilters = () => {
  let brandsArr = _brands_json__WEBPACK_IMPORTED_MODULE_0__.filter(item => !item.brand_name ? item.brand_name = "" : item.brand_name);
  brandsArr.sort((a, b) => a.brand_name.localeCompare(b.brand_name));
  const searchInput = document.querySelector(".search-brand");
  let brands = brandsArr;
  function addBrandsToFilters(data) {
    const filtersWrapper = document.querySelector(".filters__list");
    let res = "";
    data.forEach(brand => {
      res += `
                    <li>
                        <input type="checkbox" id="${brand.brand_id}" class="checkbox">
                        <label for="${brand.brand_id}" class="checkbox__label">${brand.brand_name}</label>
                    </li>
                `;
    });
    filtersWrapper.innerHTML = res;
  }
  addBrandsToFilters(brandsArr);
  searchInput.addEventListener("input", () => {
    brands = brandsArr.filter(item => item.brand_name.toLowerCase().includes(searchInput.value.toLowerCase()));
    addBrandsToFilters(brands);
  });
};

/***/ }),

/***/ "./src/modules/renderProducts.js":
/*!***************************************!*\
  !*** ./src/modules/renderProducts.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderProducts: () => (/* binding */ renderProducts)
/* harmony export */ });
/* harmony import */ var _products_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./products.json */ "./src/modules/products.json");

const renderProducts = () => {
  const products = _products_json__WEBPACK_IMPORTED_MODULE_0__;
  const itemsPerPage = 30;
  let currentPage = 1;
  const productList = document.getElementById("product-list");
  //   const pageNumberDisplay = document.getElementById("page-number");
  const prevPageButton = document.getElementById("prev-page");
  const nextPageButton = document.getElementById("next-page");
  const showMoreButton = document.getElementById('show-more');
  function getPageFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("page") ? parseInt(params.get("page")) : 1;
  }
  function setPageToURL(page) {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page);
    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
  }
  function displayProducts(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsToShow = products.slice(startIndex, endIndex);
    productsToShow.forEach(product => {
      const productItem = document.createElement("div");
      productItem.innerHTML = `
        <div class="catalog__card">
            <div class="catalog__card-img">
                <img src="${product.img ? product.img : 'emptyImg.svg'}" alt="${product.brand_name}">
            </div>
            <div class="">
            <h3 class="catalog__card-title"><a href="#!">${product.brand_name}</a> <span>6PK2120</span></h3>
                <ul class="catalog__card-list">
                    <li class="catalog__card-item">
                        <h4><a href="#!">Здесь будет наименование товара, которое может быть как длинным, так и коротким, очень длинное название...Здесь будет наименование товара, которое может быть как длинным, так и коротким, очень длинное название...Здесь будет наименование товара, которое может быть как длинным, так и коротким, очень длинное название...Здесь будет наименование товара, которое может быть как длинным, так и коротким, очень длинное название...</a></h4>
                        <span>7 дней</span>
                        <span>20 шт.</span>
                        <span class="price">2 153 ₽</span>
                        <div class="catalog__card-order">
                            <input type="number" min="1" value="1">
                            <button>
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.79134 20.2075L6.48966 3.89453H3.125M7.25268 9.22637H27.5579C28.2192 9.22637 28.6984 9.85682 28.5214 10.494L25.7099 20.6155C25.45 21.5513 24.5979 22.1989 23.6267 22.1989H10.937C9.85782 22.1989 8.9439 21.4032 8.79544 20.3343L7.25268 9.22637Z" stroke="#727271" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M12.8951 26.5296C12.8951 27.4002 12.1893 28.106 11.3186 28.106C10.448 28.106 9.74219 27.4002 9.74219 26.5296C9.74219 25.6589 10.448 24.9531 11.3186 24.9531C12.1893 24.9531 12.8951 25.6589 12.8951 26.5296Z" fill="#727271"/>
                                    <path d="M24.9008 26.5296C24.9008 27.4002 24.195 28.106 23.3243 28.106C22.4537 28.106 21.7479 27.4002 21.7479 26.5296C21.7479 25.6589 22.4537 24.9531 23.3243 24.9531C24.195 24.9531 24.9008 25.6589 24.9008 26.5296Z" fill="#727271"/>
                                </svg>                                        
                            </button>
                        </div>
                    </li>                                
                </ul>
            </div>
        </div>
      
      `;
      productList.appendChild(productItem);
    });
    prevPageButton.disabled = page === 1;
    nextPageButton.disabled = endIndex >= products.length;
  }
  prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      setPageToURL(currentPage);
      productList.innerHTML = "";
      displayProducts(currentPage);
    }
  });
  nextPageButton.addEventListener("click", () => {
    if (currentPage * itemsPerPage < products.length) {
      currentPage++;
      setPageToURL(currentPage);
      productList.innerHTML = "";
      displayProducts(currentPage);
    }
  });
  window.addEventListener("load", () => {
    currentPage = getPageFromURL();
    displayProducts(currentPage);
  });
  showMoreButton.addEventListener('click', () => {
    currentPage++;
    setPageToURL(currentPage);
    displayProducts(currentPage);
  });
  console.log(products[0]);
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./node_modules/sass-loader/dist/cjs.js!./src/style.sass":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./node_modules/sass-loader/dist/cjs.js!./src/style.sass ***!
  \***************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/Tahoma.ttf */ "./src/fonts/Tahoma.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/Tahoma-Bold.ttf */ "./src/fonts/Tahoma-Bold.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! img/close.svg */ "./src/img/close.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! img/checked.svg */ "./src/img/checked.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! img/sort-icon.svg */ "./src/img/sort-icon.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! img/sort-arrow.svg */ "./src/img/sort-arrow.svg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_5___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `*, *:before, *:after {
  box-sizing: border-box;
}

html, body, div, span, object, iframe, figure, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, code, em, img, small, strike, strong, sub, sup, tt, b, u, i, ol, ul, li, fieldset, form, label, table, caption, tbody, tfoot, thead, tr, th, td, main, canvas, embed, footer, header, nav, section, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -webkit-text-size-adjust: none;
     -moz-text-size-adjust: none;
          text-size-adjust: none;
}

footer, header, nav, section, main {
  display: block;
}

body {
  line-height: 1;
}

ol, ul {
  list-style: none;
}

blockquote, q {
  quotes: none;
}

blockquote:before, blockquote:after, q:before, q:after {
  content: "";
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

input {
  -webkit-appearance: none;
  border-radius: 0;
}

a {
  color: inherit;
  -webkit-text-decoration: none;
  text-decoration: none;
}

img {
  width: 100%;
}

@font-face {
  font-family: "Tahoma";
  src: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
  font-weight: 400;
}
@font-face {
  font-family: "Tahoma";
  src: url(${___CSS_LOADER_URL_REPLACEMENT_1___});
  font-weight: 700;
}
html {
  scrollbar-gutter: stable;
}

body {
  overflow-x: clip;
  position: relative;
  font-family: "Tahoma", sans-serif;
  font-size: 14px;
  color: #3c3e40;
}

.container {
  max-width: 1500px;
  padding: 0 15px;
  margin: 0 auto;
}

.catalog-page {
  margin-top: 40px;
}
.catalog-page .container {
  display: grid;
  grid-template-columns: 230px auto;
  grid-gap: 16px;
  gap: 16px;
}
.catalog-page .select {
  margin-left: auto;
  margin-bottom: 16px;
}

.catalog__header {
  padding: 15px 20px;
  background: #f5f5f5;
  border-radius: 8px;
  display: grid;
  grid-template-columns: auto 160px 110px 160px 90px;
  grid-gap: 10px;
  gap: 10px;
  margin-bottom: 20px;
}

.catalog__cards {
  margin-bottom: 90px;
}

.chips {
  display: inline-block;
  width: -moz-fit-content;
  width: fit-content;
  padding: 7px 45px 7px 15px;
  border-radius: 20px;
  background: #d7262e;
  color: #ffffff;
  position: relative;
  font-size: 13px;
  cursor: pointer;
  margin-bottom: 20px;
}
.chips::before {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  background: url(${___CSS_LOADER_URL_REPLACEMENT_2___}) no-repeat center;
  top: 50%;
  transform: translateY(-50%);
  right: 15px;
}

.btn {
  display: block;
  border: none;
  background: #539ded;
  color: #ffffff;
  padding: 14px 60px;
  border-radius: 8px;
  margin: 0 auto;
  cursor: pointer;
  tenasition: background 0.15s;
  width: -moz-fit-content;
  width: fit-content;
}
.btn:hover {
  background: #2e89eb;
}

.filters__title {
  text-transform: uppercase;
  margin-bottom: 15px;
}
.filters__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 6px 0;
  max-height: 384px;
  overflow-x: hidden;
}
.filters__list::-webkit-scrollbar {
  width: 7px;
}
.filters__list::-webkit-scrollbar-track {
  background: #d7d7d7;
  border-radius: 8px;
}
.filters__list::-webkit-scrollbar-thumb {
  background: #b2adad;
  border-radius: 8px;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #b2adad;
  padding: 4px 10px;
  border-radius: 5px;
  margin-bottom: 13px;
}
.input-wrapper input {
  border: none;
  background: transparent;
  padding: 0;
  font-family: inherit;
  font-size: 14px;
}
.input-wrapper input:focus {
  outline: none;
}
.input-wrapper input::-moz-placeholder {
  color: #b2adad;
}
.input-wrapper input::placeholder {
  color: #b2adad;
}

.checkbox {
  display: none;
}
.checkbox:checked + .checkbox__label::after {
  transform: scale(1);
}
.checkbox__label {
  color: #727271;
  padding-left: 28px;
  position: relative;
  display: inline-block;
}
.checkbox__label::before, .checkbox__label::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 18px;
  height: 18px;
  border: 1px solid #b2adad;
  border-radius: 4px;
}
.checkbox__label::after {
  background: #d7262e url(${___CSS_LOADER_URL_REPLACEMENT_3___}) no-repeat center;
  border-color: #d7262e;
  transition: transform 0.15s;
  transform: scale(0);
}

.select {
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  color: #727271;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  max-width: 330px;
  transition: box-shadow 0.15s, max-height 0.15s;
}
.select.active {
  background: #ffffff;
  z-index: 10;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}
.select.active .select__header::after {
  transform: rotate(180deg) translateY(50%);
}
.select__header {
  position: relative;
}
.select__header::before, .select__header::after {
  content: "";
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  pointer-events: none;
}
.select__header::before {
  left: 15px;
  background: url(${___CSS_LOADER_URL_REPLACEMENT_4___});
}
.select__header::after {
  right: 15px;
  background: url(${___CSS_LOADER_URL_REPLACEMENT_5___});
  transition: transform 0.15s;
}
.select__header .select__title {
  padding: 12px 0 12px 48px;
}
.select button {
  border: none;
  background: transparent;
  color: inherit;
  font-size: 14px;
  padding: 15px 0 15px 50px;
  transition: background 0.15s;
  width: 100%;
  text-align: left;
  cursor: pointer;
  min-width: -moz-max-content;
  min-width: max-content;
}
.select button:hover {
  background: #f5f5f5;
}

.catalog__card {
  padding: 7px 20px 18px 20px;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: 110px auto;
  grid-gap: 20px;
  gap: 20px;
  align-items: start;
  font-size: 13px;
  margin-bottom: 16px;
  transition: transform 0.15s;
}
.catalog__card:hover {
  transform: translateY(-1px);
}
.catalog__card-img {
  display: flex;
  align-items: center;
  justify-content: center;
}
.catalog__card-img svg, .catalog__card-img img {
  width: 100%;
}
.catalog__card-title {
  font-weight: 700;
  margin-bottom: 17px;
  display: flex;
  align-items: center;
  gap: 50px;
}
.catalog__card-title span {
  color: #727271;
}
.catalog__card-item {
  display: grid;
  grid-template-columns: auto 160px 110px 160px 90px;
  grid-gap: 10px;
  gap: 10px;
  align-items: center;
  color: #727271;
  border-top: 1px solid #f5f5f5;
  padding-top: 4px;
  transition: color 0.15s;
}
.catalog__card-item:hover {
  color: #d7262e;
}
.catalog__card-item h4 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
}
.catalog__card-item .price {
  font-weight: 700;
}
.catalog__card-order {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.catalog__card-order input {
  width: 32px;
  border: 1px solid #727271;
  border-radius: 4px;
  padding: 9px 3px;
  color: #727271;
  text-align: center;
}
.catalog__card-order input::-webkit-outer-spin-button, .catalog__card-order input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.catalog__card-order button {
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
}
.catalog__card-order button:hover svg {
  animation: shake-cart 0.8s ease-in infinite alternate;
}

@keyframes shake-cart {
  30% {
    transform: rotate(15deg);
  }
  100% {
    transform: rotate(-15deg);
  }
}`, "",{"version":3,"sources":["webpack://./src/sass/_reset.sass","webpack://./src/style.sass","webpack://./src/sass/_fonts.sass","webpack://./src/sass/_vars.sass","webpack://./src/sass/_filters.sass","webpack://./src/sass/_sort.sass","webpack://./src/sass/_catalog__card.sass"],"names":[],"mappings":"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","sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/index.html":
/*!************************!*\
  !*** ./src/index.html ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Avtoalfa</title>
</head>
<body>
    <main class="main catalog-page">
        <div class="container">
            <div class="filters">
                <h2 class="filters__title">бренды</h2>
                <div class="input-wrapper ">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.5493 19.5493L28.6683 28.6683M22.3328 12.8295C22.3328 18.078 18.078 22.3328 12.8295 22.3328C7.58094 22.3328 3.32617 18.078 3.32617 12.8295C3.32617 7.58094 7.58094 3.32617 12.8295 3.32617C18.078 3.32617 22.3328 7.58094 22.3328 12.8295Z" stroke="#B2ADAD" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>                        
                    <input type="text" class="search-brand" placeholder="Поиск по брендам">
                </div>
                <ul class="filters__list"></ul>
            </div>
            
            <div class="catalog">
                <div class="select">
                    <div class="select__header">
                        <button class="select__title"></button>
                        <input type="hidden">
                    </div>
                    <div class="select__list">
                        <ul></ul>
                    </div>
                </div>

                <div class="chips">Бренды: АктивПром-Плюс </div>
                <div class="catalog__header">
                    <span class="catalog__header-title">Бренд, артикул, наименование</span>
                    <span>Доставка</span>
                    <span>Наличие</span>
                    <span>Цена за ед.</span>
                    <span>Кратность</span>
                </div>
                
                <div class="catalog__cards" id="product-list">
                    <!-- <div class="catalog__card">
                        <div class="catalog__card-img">
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.33594 45.5913L15.1952 39.732C16.965 37.9622 19.8345 37.9622 21.6043 39.732L23.1808 41.3085C25.3202 43.4479 28.9151 42.9302 30.3639 40.274L37.469 27.248C39.1011 24.2559 43.3278 24.0684 45.2184 26.9043L54.6551 41.0594M13.8679 54.6551H50.1232C52.6261 54.6551 54.6551 52.6261 54.6551 50.1232V13.8679C54.6551 11.3649 52.6261 9.33594 50.1232 9.33594H13.8679C11.3649 9.33594 9.33594 11.3649 9.33594 13.8679V50.1232C9.33594 52.6261 11.3649 54.6551 13.8679 54.6551ZM28.5521 24.0647C28.5521 27.1933 26.0158 29.7296 22.8872 29.7296C19.7585 29.7296 17.2223 27.1933 17.2223 24.0647C17.2223 20.936 19.7585 18.3998 22.8872 18.3998C26.0158 18.3998 28.5521 20.936 28.5521 24.0647Z" stroke="#B2ADAD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>                            
                            <img src="" alt=""> 
                        </div>
                       <div class="">
                        <h3 class="catalog__card-title"><a href="#!">Denckermann</a> <span>6PK2120</span></h3>
                            <ul class="catalog__card-list">
                                <li class="catalog__card-item">
                                    <h4><a href="#!">Здесь будет наименование товара, которое может быть как длинным, так и коротким, очень длинное название...Здесь будет наименование товара, которое может быть как длинным, так и коротким, очень длинное название...Здесь будет наименование товара, которое может быть как длинным, так и коротким, очень длинное название...Здесь будет наименование товара, которое может быть как длинным, так и коротким, очень длинное название...</a></h4>
                                    <span>7 дней</span>
                                    <span>20 шт.</span>
                                    <span class="price">2 153 ₽</span>
                                    <div class="catalog__card-order">
                                        <input type="number" min="1" value="1">
                                        <button>
                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.79134 20.2075L6.48966 3.89453H3.125M7.25268 9.22637H27.5579C28.2192 9.22637 28.6984 9.85682 28.5214 10.494L25.7099 20.6155C25.45 21.5513 24.5979 22.1989 23.6267 22.1989H10.937C9.85782 22.1989 8.9439 21.4032 8.79544 20.3343L7.25268 9.22637Z" stroke="#727271" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M12.8951 26.5296C12.8951 27.4002 12.1893 28.106 11.3186 28.106C10.448 28.106 9.74219 27.4002 9.74219 26.5296C9.74219 25.6589 10.448 24.9531 11.3186 24.9531C12.1893 24.9531 12.8951 25.6589 12.8951 26.5296Z" fill="#727271"/>
                                                <path d="M24.9008 26.5296C24.9008 27.4002 24.195 28.106 23.3243 28.106C22.4537 28.106 21.7479 27.4002 21.7479 26.5296C21.7479 25.6589 22.4537 24.9531 23.3243 24.9531C24.195 24.9531 24.9008 25.6589 24.9008 26.5296Z" fill="#727271"/>
                                            </svg>                                        
                                        </button>
                                    </div>
                                </li>                                
                            </ul>
                       </div>
                    </div> -->
                </div>

                <button class="btn" id="show-more">Показать еще</button>
                
                <div class="pagination">
                    <button class="pagination-btn prev" id="prev-page">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.16 14.3367L4.84 8.01797L11.16 1.66334" stroke="#B2ADAD" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>

                    <button class="pagination-btn next" id="next-page">
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.83984 2.4613L11.1583 8.77983L4.83984 15.1343" stroke="#539DED" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>                            
                    </button>
                </div>
            </div>
        </div>
    </main>
</body>
</html>`;
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./src/style.sass":
/*!************************!*\
  !*** ./src/style.sass ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_style_sass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!../node_modules/sass-loader/dist/cjs.js!./style.sass */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./node_modules/sass-loader/dist/cjs.js!./src/style.sass");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_style_sass__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_style_sass__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_style_sass__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_style_sass__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/fonts/Tahoma-Bold.ttf":
/*!***********************************!*\
  !*** ./src/fonts/Tahoma-Bold.ttf ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "63edd6aaed6e99651305.ttf";

/***/ }),

/***/ "./src/fonts/Tahoma.ttf":
/*!******************************!*\
  !*** ./src/fonts/Tahoma.ttf ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "dad012ae18b75ca079e4.ttf";

/***/ }),

/***/ "./src/img/checked.svg":
/*!*****************************!*\
  !*** ./src/img/checked.svg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "efcff5bdcfcc2b14cc22.svg";

/***/ }),

/***/ "./src/img/close.svg":
/*!***************************!*\
  !*** ./src/img/close.svg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "360d33316a00a3d80304.svg";

/***/ }),

/***/ "./src/img/sort-arrow.svg":
/*!********************************!*\
  !*** ./src/img/sort-arrow.svg ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "45d15ab11fa745dee6f0.svg";

/***/ }),

/***/ "./src/img/sort-icon.svg":
/*!*******************************!*\
  !*** ./src/img/sort-icon.svg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "0a4ab8f34eff95a9f95c.svg";

/***/ }),

/***/ "./src/modules/brands.json":
/*!*********************************!*\
  !*** ./src/modules/brands.json ***!
  \*********************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"brand_id":"80962861","brand_name":"Альтернатива"},{"brand_id":"36687433","brand_name":"ГАЗ ПАО"},{"brand_id":"36687441","brand_name":"TRIALLI"},{"brand_id":"84294877","brand_name":"Autocomponent"},{"brand_id":"36687432","brand_name":"УАЗ ООО"},{"brand_id":"93160487","brand_name":null},{"brand_id":"83424915","brand_name":"АВТО-ТРОС"},{"brand_id":"83429463","brand_name":"THERMOTRANS"},{"brand_id":"61114831","brand_name":"Балаково"},{"brand_id":"36687046","brand_name":"Mercedes - Benz"},{"brand_id":"80914593","brand_name":"Technik"},{"brand_id":"81457330","brand_name":"ПОЛИТЕХНИК"},{"brand_id":"83460251","brand_name":"FG WILSON"},{"brand_id":"83800247","brand_name":"Лидер"},{"brand_id":"83398620","brand_name":"MTA"},{"brand_id":"1278","brand_name":"Россия"},{"brand_id":"36687431","brand_name":"Курская подшипниковая компания"},{"brand_id":"83451382","brand_name":"ХИМСИНТЕЗ"},{"brand_id":"36687040","brand_name":"КамАЗ ПАО"},{"brand_id":"80862034","brand_name":"FLRS"},{"brand_id":"82694570","brand_name":"SSANGYONG"},{"brand_id":"88085000","brand_name":"SSANG YONG"},{"brand_id":"82964292","brand_name":"JAC"},{"brand_id":"42875562","brand_name":"Chery"},{"brand_id":"87804743","brand_name":"OMODA"},{"brand_id":"36687439","brand_name":"ЗМЗ ПАО"},{"brand_id":"82582066","brand_name":"ГБЦ"},{"brand_id":"83855627","brand_name":"Sitrak"},{"brand_id":"36687287","brand_name":"НАНОЭКОХИМ"},{"brand_id":"83605859","brand_name":"БелЗАН"},{"brand_id":"83425111","brand_name":"ТЕНТ-ПРОМ"},{"brand_id":"61114824","brand_name":"Красная Этна"},{"brand_id":"61115021","brand_name":"ЛУКОЙЛ"},{"brand_id":"82700692","brand_name":"HOWO"},{"brand_id":"83416486","brand_name":"LADA"},{"brand_id":"80586712","brand_name":"STELLOX"},{"brand_id":"81307915","brand_name":"Hammer Kupplungen"},{"brand_id":"80439295","brand_name":"АВТОСИЛ"},{"brand_id":"42875565","brand_name":"ПАЗ"},{"brand_id":"61114922","brand_name":"ВЭЛВ"},{"brand_id":"61114954","brand_name":"БелАвтоКомплект"},{"brand_id":"83381865","brand_name":"MAZDA"},{"brand_id":"83424919","brand_name":"АВТОВАЗ"},{"brand_id":"84531825","brand_name":"ЗавГар"},{"brand_id":"87318449","brand_name":"Автонормаль"},{"brand_id":"83814043","brand_name":"SuperTractor"},{"brand_id":"82802446","brand_name":"РЗИ"},{"brand_id":"87625615","brand_name":"Forward"},{"brand_id":"81099905","brand_name":"УНИП СЕРВИС"},{"brand_id":"83438173","brand_name":"RENAULT/LADA"},{"brand_id":"36687414","brand_name":"TOYOTA"},{"brand_id":"83420787","brand_name":"HONDA"},{"brand_id":"83398675","brand_name":"VIKA"},{"brand_id":"83598007","brand_name":"HAUBERK"},{"brand_id":"88285696","brand_name":"PARTS UNLIMITED"},{"brand_id":"83442573","brand_name":"ИЗУР"},{"brand_id":"80738429","brand_name":"MAXPOWER"},{"brand_id":"36687426","brand_name":"LMX"},{"brand_id":"83424911","brand_name":"АБПА"},{"brand_id":"83455802","brand_name":"ТВЭКС"},{"brand_id":"41874209","brand_name":"Уралэластотехника"},{"brand_id":"58339415","brand_name":"StP"},{"brand_id":"88291751","brand_name":"STANDARTPLAST"},{"brand_id":"83429472","brand_name":"FILMANT"},{"brand_id":"85703117","brand_name":"O.E.M."},{"brand_id":"82961134","brand_name":"BOSAL"},{"brand_id":"83050600","brand_name":"VAG"},{"brand_id":"86095926","brand_name":"NEW ERA"},{"brand_id":"36687049","brand_name":"Bosch"},{"brand_id":"36687438","brand_name":"ZOMMER"},{"brand_id":"82551962","brand_name":"KRAUF"},{"brand_id":"87313109","brand_name":"Эксперт РТИ"},{"brand_id":"81969643","brand_name":"Exit"},{"brand_id":"80610139","brand_name":"SOFT99"},{"brand_id":"82315113","brand_name":"RADDO"},{"brand_id":"83451385","brand_name":"Завод кондиционеров Август"},{"brand_id":"92512063","brand_name":null},{"brand_id":"89663299","brand_name":"TRUCKMARK"},{"brand_id":"61114834","brand_name":"Завод ТРУД"},{"brand_id":"36719250","brand_name":"Elring Klinger"},{"brand_id":"36687059","brand_name":"БРТ"},{"brand_id":"55183755","brand_name":"Волгопромтранс"},{"brand_id":"50573951","brand_name":"PE"},{"brand_id":"84794441","brand_name":"REF"},{"brand_id":"82199518","brand_name":"Transmaster Universal"},{"brand_id":"89695206","brand_name":"Sennebogen"},{"brand_id":"88291768","brand_name":"URO"},{"brand_id":"60612912","brand_name":"МАРК"}]');

/***/ }),

/***/ "./src/modules/products.json":
/*!***********************************!*\
  !*** ./src/modules/products.json ***!
  \***********************************/
/***/ ((module) => {


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.html */ "./src/index.html");
/* harmony import */ var _style_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.sass */ "./src/style.sass");
/* harmony import */ var _modules_filtersList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/filtersList */ "./src/modules/filtersList.js");
/* harmony import */ var _modules_customSelect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/customSelect */ "./src/modules/customSelect.js");
/* harmony import */ var _modules_renderProducts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/renderProducts */ "./src/modules/renderProducts.js");





document.addEventListener('DOMContentLoaded', function () {
  (0,_modules_filtersList__WEBPACK_IMPORTED_MODULE_2__.renderFilters)();
  (0,_modules_customSelect__WEBPACK_IMPORTED_MODULE_3__.customSelect)();
  (0,_modules_renderProducts__WEBPACK_IMPORTED_MODULE_4__.renderProducts)();
});
})();

/******/ })()
;
//# sourceMappingURL=script.348c96f20bec89176a99.js.map