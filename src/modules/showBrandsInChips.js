import brandsList from './brands.json'
import { getSelectedBrandsFromUrl} from './getSelectedBrandsFromUrl';

export function showBrandsInChips () {
    const chips = document.querySelector('.chips span')
    const checkedBrands = getSelectedBrandsFromUrl()
    const brands = brandsList.filter(brand => checkedBrands.includes(brand.brand_id))
    chips.parentNode.classList.add('visible')
    chips.textContent = (brands.length === 1) ? brands[0].brand_name : `${brands.length} знач.`
}