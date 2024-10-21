import renderBrandsInFilters from './createFilterItems';
import { clearSerchInput } from './clearSerchInput';
import { showBrandItemsCount } from './showBrandItemsCount';
import { showBrandsInChips } from './showBrandsInChips';
import { getSelectedBrandsFromUrl } from './getSelectedBrandsFromUrl';
import { clearAllFilters } from './createFilterItems';
import { renderProducts } from "./renderProducts";


export const renderFilters = (brandsList, items) => {
  const brandsArr = brandsList.filter((barnd) => barnd.brand_name);
  brandsArr.sort((a, b) => a.brand_name.localeCompare(b.brand_name));
  const searchInput = document.querySelector(".search-brand");
  const form = document.getElementById('form');
  const chips = document.querySelector('.chips');

  // отрисовываем список брендов
  renderBrandsInFilters(brandsArr); 
  // ищем бренды в поиске
  searchInput.addEventListener("input", () => {
    let brands = brandsArr.filter((item) =>
      item.brand_name.toLowerCase().includes(searchInput.value.toLowerCase().trim())
    );
    renderBrandsInFilters(brands);
  });  
  // очищаем поиск
  clearSerchInput(brandsList);
  
  // считаем кол-во едениц товара каждого бренда
  form.addEventListener('change', () => {     
      let checkedBrands = getSelectedBrandsFromUrl();
      showBrandItemsCount(items, checkedBrands)
      showBrandsInChips()
  });

  // показываем чипс с отмеченными брендами
  if (getSelectedBrandsFromUrl().length > 0) showBrandsInChips();
  
  // очищаем фильтры нажатием на чипс
  chips.addEventListener('click', ()=> {
    clearAllFilters();
    showBrandItemsCount(items, []);
    chips.classList.remove('visible');
    renderProducts(items, []);
    renderBrandsInFilters(brandsArr);
  })
};
