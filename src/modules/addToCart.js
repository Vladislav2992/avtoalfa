export const addToCart = () => { 
      const cartBtns = document.querySelectorAll(".catalog__card-cart");      
      cartBtns.forEach((cart) => {
        cart.addEventListener("click", () => {         
          cart.innerHTML = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.66634 20.313L6.36466 4H3M7.12768 9.33184L8.67044 20.4397C8.8189 21.5086 9.73282 22.3044 10.812 22.3044H23.5017C24.4729 22.3044 25.325 21.6568 25.5849 20.721L28.3964 10.5995C28.5734 9.96229 28.0942 9.33184 27.4329 9.33184H26.8789H20.8789H7.12768Z" stroke="#009500" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.7701 26.6351C12.7701 27.5057 12.0643 28.2115 11.1936 28.2115C10.323 28.2115 9.61719 27.5057 9.61719 26.6351C9.61719 25.7644 10.323 25.0586 11.1936 25.0586C12.0643 25.0586 12.7701 25.7644 12.7701 26.6351Z" fill="#009500"/>
<path d="M24.7758 26.6351C24.7758 27.5057 24.07 28.2115 23.1993 28.2115C22.3287 28.2115 21.6229 27.5057 21.6229 26.6351C21.6229 25.7644 22.3287 25.0586 23.1993 25.0586C24.07 25.0586 24.7758 25.7644 24.7758 26.6351Z" fill="#009500"/>
<path d="M13 15.551L16.5294 19.0805L23 12.6099" stroke="#009500" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
        });
      });
}