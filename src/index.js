import './index.html'
import './style.sass'

import items from  './modules/products.json';
import brandsList from "./modules/brands.json";
import {renderFilters} from  './modules/renderFilters';
import {customSelect} from  './modules/customSelect';
import {renderProducts} from  './modules/renderProducts';
import {sortProductItems} from  './modules/sortProductItems';
import { getSelectedBrandsFromUrl } from "./modules/getSelectedBrandsFromUrl";

const arr = [
    {
     title: 'Сначала дешевые',
     value: 'price'   
    },
    {
     title: 'Сначала дорогие',
     value: '-price'   
    },
    {
     title: 'Сначала большее количество',
     value: 'stock'   
    },
    {
     title: 'Быстрая доставка',
     value: 'delivery'   
    },
]

document.addEventListener('DOMContentLoaded', ()=> {
    renderFilters(brandsList, items);
    customSelect(arr);
    const checkedBrands = getSelectedBrandsFromUrl();
    renderProducts(items, checkedBrands);
    sortProductItems();
});