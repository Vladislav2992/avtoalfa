import renderBrandsInFilters from './createFilterItems'

const searchInput = document.querySelector(".search-brand");
const clearBtn = document.querySelector(".clear-search");

export function clearSerchInput(brandsArr) {
    clearBtn.addEventListener("click", (e) => {
      e.preventDefault()
      searchInput.value = "";     
      searchInput.focus();
      renderBrandsInFilters(brandsArr);
      clearBtn.classList.remove("visible");
    });

    searchInput.addEventListener("input", () => {
      if (searchInput.value !== "") {
        clearBtn.classList.add("visible");
      } else {
        clearBtn.classList.remove("visible");
        renderBrandsInFilters(brandsArr);
      }
    });
  }