import items from "./products.json";
import brands from "./brands.json"
import debounce from "lodash.debounce";
import { getSelectedBrandsFromUrl } from "./getSelectedBrandsFromUrl";
import { renderProducts } from "./renderProducts";
import renderBrandsInFilters from "./createFilterItems";
const filtersApplyBtn = document.querySelector(".filters-apply");

export function showFiltersApplyBtn(e) {
  filtersApplyBtn.classList.add("visible");
  filtersApplyBtn.style.top = `${e.clientY - 50}px`;
  hideElement(filtersApplyBtn);
}

filtersApplyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const checkedBrands = getSelectedBrandsFromUrl();
  renderProducts(items, checkedBrands);
  renderBrandsInFilters(brands)
  scrollTo(0, 0);
});

const hideElement = debounce((element) => {
  element.classList.remove("visible");
}, 2000);
