export function addToOrder () {
    const inputWrappers = document.querySelectorAll('.catalog__card-input');
    if (inputWrappers.length > 0) {
        inputWrappers.forEach(inputGroup => {
            const input = inputGroup.querySelector('input');
            const increment = inputGroup.querySelector('.catalog__card-increment');
            const decrement = inputGroup.querySelector('.catalog__card-decrement');

            increment.addEventListener('click', ()=> input.value++)
            decrement.addEventListener('click', ()=> (input.value > 1) ? input.value-- : decrement.disabled)
        })
    }
}