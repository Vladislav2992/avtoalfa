export function sortProductItems (sortType) {
    if(sortType) {
        const productCards = document.querySelectorAll('.catalog__card')

        productCards.forEach(card => {
            const items = Array.from(card.querySelectorAll('.catalog__card-item'));

            items.sort((a,b) => {
                let aValue, bValue

                switch (sortType) {
                    case 'price':
                        aValue = parseFloat(a.querySelector('.price').textContent.replace(' ₽', ''));
                        bValue = parseFloat(b.querySelector('.price').textContent.replace(' ₽', ''));
                        break;
                    case '-price': 
                        aValue = parseFloat(b.querySelector('.price').textContent.replace(' ₽', ''));
                        bValue = parseFloat(a.querySelector('.price').textContent.replace(' ₽', ''));
                        break;
                    case 'stock': 
                        aValue = parseFloat(b.querySelector('.stock').textContent.replace(' шт.', ''));
                        bValue = parseFloat(a.querySelector('.stock').textContent.replace(' шт.', ''));
                        break;
                    case 'delivery': 
                        aValue = parseFloat(a.querySelector('.delivery').textContent.replace(' дней', ''));
                        bValue = parseFloat(b.querySelector('.delivery').textContent.replace(' дней', ''));
                        break;
                    }
                return aValue - bValue
            })

            const cardList = card.querySelector('.catalog__card-list');
            cardList.innerHTML = '';
            items.forEach(item => cardList.appendChild(item));
        })
    }
}