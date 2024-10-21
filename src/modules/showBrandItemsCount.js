export function showBrandItemsCount (items, checkedBrands) {
    const filtersApplyBtn = document.querySelector('.filters-apply');
    const title = filtersApplyBtn.querySelector('.total');
    if (checkedBrands.length > 0) {
        title.textContent =  items.filter(product => checkedBrands.includes(product.brand_id)).length      
      } else {
        title.textContent = items.filter(item => item.brand_name).length
      }
}