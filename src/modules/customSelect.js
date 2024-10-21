import { sortProductItems } from './sortProductItems'
export const customSelect = (selectValues) => {
    const selects = document.querySelectorAll('.select')
    
    if(selects.length > 0) {
        selects.forEach(select => {
            // let selectValues = arr;
            const selectedOptionBtn = select.querySelector('.select__title');            
            const optionsList = select.querySelector('.select__list ul'); 
            const optionsListWrapper = select.querySelector('.select__list'); 
            const input = select.querySelector('input'); 
            
            function openSelect () {
                select.classList.add('active');
                optionsListWrapper.style.minHeight = optionsList.offsetHeight + 'px';
            }
            function closeSelect () {
                select.classList.remove('active');
                optionsListWrapper.style.minHeight = '0px';                
            }            
            function renderOptions () {
                let optionsElements = '';
                for (let i = 0; i < selectValues.length; i++) {
                    optionsElements += `<li><button class="select__item" data-value="${selectValues[i].value}">${selectValues[i].title}</button></li>`;
                }
                optionsList.innerHTML = optionsElements;
                sortProductItems(getSortFromURL())
            }
            function getSortFromURL() {
                const params = new URLSearchParams(window.location.search);
                return params.get('sort') || '0'; 
            }
            
            // Обновление URL при выборе сортировки
            function setSortToURL(sortType) {
                const params = new URLSearchParams(window.location.search);
                params.set('sort', sortType);
                window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
            }

            const firstRenderObject = selectValues.find(item => item.value.includes(getSortFromURL()));
            selectedOptionBtn.innerText = firstRenderObject ? firstRenderObject.title : selectValues[0].title;
            optionsListWrapper.style.minHeight = '0px'
            renderOptions()

            selectedOptionBtn.addEventListener('click', ()=>{
                (select.classList.contains('active')) ? closeSelect() : openSelect() 
            })            

            const options = select.querySelectorAll('.select__item');           
            options.forEach((option) => {
                option.addEventListener('click', ()=>{
                    const optionValue = option.dataset.value;
                    input.value = optionValue
                    selectedOptionBtn.textContent = option.textContent
                    sortProductItems(optionValue)
                    setSortToURL(optionValue)
                    closeSelect();
                })
            })


            document.addEventListener('click', (e)=>{
                if (!select.contains(e.target)) closeSelect();
            })
        })
    }
} 