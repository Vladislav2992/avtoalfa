import {showFiltersApplyBtn} from './showFiltersApplyBtn';
import {getSelectedBrandsFromUrl} from './getSelectedBrandsFromUrl';

let selectedBrandIds = getSelectedBrandsFromUrl();

export default function renderBrandsInFilters(arr) {
  const data = arr.filter((item) => item.brand_name);  
  data.forEach(item => item.isChecked = selectedBrandIds.includes(item.brand_id))
  data.sort((a, b) => {
    if (a.isChecked === b.isChecked) {
      return a.brand_name.localeCompare(b.brand_name);
    }
    return b.isChecked - a.isChecked;
  });
 
  const filtersWrapper = document.querySelector(".filters__list");
  let res = "";
  data.forEach((brand) => {
    const isChecked = selectedBrandIds.includes(brand.brand_id) ? "checked" : "";
    res += `
      <li>
        <input type="checkbox" id="${brand.brand_id}" class="checkbox" ${isChecked}>
        <label for="${brand.brand_id}" data-id="${brand.brand_id}" class="checkbox__label">${brand.brand_name}</label>
      </li>
    `;
  });
  filtersWrapper.innerHTML = res;
  addListenersToLabel();
}

function addListenersToLabel() {
  const filterList = document.querySelectorAll(".checkbox__label");
  filterList.forEach((filter) => {
    filter.addEventListener("click", (e) => {
      const brandId = e.target.dataset.id;
      if (!selectedBrandIds.includes(brandId)) {
        selectedBrandIds.push(brandId);
      } else {
        selectedBrandIds = selectedBrandIds.filter(id => id !== brandId);
      }
      showFiltersApplyBtn(e) 
      updateUrlWithSelectedBrands(selectedBrandIds); 
    });
  }); 
}

function updateUrlWithSelectedBrands(selectedBrandIds) {
  const url = new URL(window.location);
  url.searchParams.set("brands", selectedBrandIds.join(","));
  window.history.replaceState(null, "", url);
}

export function clearAllFilters() {
  selectedBrandIds = [];
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => (checkbox.checked = false));
  const url = new URL(window.location);
  url.searchParams.delete("brands");
  url.searchParams.delete("sort");
  url.searchParams.delete("page");
  window.history.replaceState(null, "", url);
}