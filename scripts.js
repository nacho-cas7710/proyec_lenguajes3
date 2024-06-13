//posta//mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
document.addEventListener('DOMContentLoaded', function () {
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');
    const showAllButton = document.getElementById('show-all-button');
    const productCards = document.querySelectorAll('.product-card');
    const categoryHeadings = document.querySelectorAll('section.products h3');
    const categoryImages = document.querySelectorAll('section.products img');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout');
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginFormContainer = document.getElementById('login-form-container');
    const registerFormContainer = document.getElementById('register-form-container');
    const toggleRegisterButton = document.getElementById('toggle-register');

    toggleRegisterButton.addEventListener('click', function () {
        if (loginFormContainer.style.display === 'none') {
            loginFormContainer.style.display = 'block';
            registerFormContainer.style.display = 'none';
            toggleRegisterButton.textContent = '¿No tienes cuenta? Regístrate aquí';
        } else {
            loginFormContainer.style.display = 'none';
            registerFormContainer.style.display = 'block';
            toggleRegisterButton.textContent = '¿Ya tienes cuenta? Inicia sesión aquí';
        }
    });

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // Aquí deberías agregar la funcionalidad para autenticar al usuario con tu backend.
        alert('Inicio de sesión exitoso');
    });

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // Aquí deberías agregar la funcionalidad para registrar al usuario con tu backend.
        alert('Registro exitoso');
    });






    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Aquí podrías agregar la funcionalidad para enviar el formulario a tu backend.

        // Mostrar mensaje de éxito
        successMessage.style.display = 'block';

        // Limpiar el formulario
        contactForm.reset();
    });
   










    let cart = [];

    function searchProducts() {
        const searchTerm = searchBar.value.trim().toLowerCase();
        let categoryVisible = new Set();

        productCards.forEach(card => {
            const productName = card.querySelector('h3').textContent.trim().toLowerCase();
            const productCategory = card.getAttribute('data-category').toLowerCase();
            const productImage = card.querySelector('img'); // Obtener la imagen del producto

            if (productName.includes(searchTerm) || productCategory.includes(searchTerm)) {
                card.style.display = 'block';
                productImage.style.display = 'block'; // Mostrar la imagen del producto
                categoryVisible.add(productCategory);
            } else {
                card.style.display = 'none';
                productImage.style.display = 'none'; // Ocultar la imagen del producto
            }
        });

        categoryHeadings.forEach(heading => {
            if (categoryVisible.has(heading.id)) {
                heading.style.display = 'block';
            } else {
                heading.style.display = 'none';
            }
        });

        categoryImages.forEach(image => {
            const category = image.getAttribute('alt').toLowerCase();
            if (categoryVisible.has(category)) {
                image.style.display = 'block';
            } else {
                image.style.display = 'none';
            }
        });
    }
    function showAllProducts() {
        // Recargar la página para mostrar todos los productos nuevamente
        window.location.reload();
    }
    function showAllProducts() {
        productCards.forEach(card => {
            card.style.display = 'inline-block'; // Asegúrate de usar 'inline-block' aquí también
        });
        categoryHeadings.forEach(heading => {
            heading.style.display = 'block'; // Mostrar todos los encabezados de categoría
        });
        categoryImages.forEach(image => {
            image.style.display = 'block'; // Mostrar todas las imágenes de categoría
        });
    }
    
    

    

    

    function addToCart(productName, productPrice) {
        cart.push({ name: productName, price: parseFloat(productPrice) });
        renderCart();
        alert(`${productName} fue añadido al carrito.`);
    }

    function renderCart() {
        cartItemsList.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItemsList.appendChild(li);
            totalPrice += item.price;
        });

        cartTotal.textContent = totalPrice.toFixed(2);
    }

    function checkout() {
        alert('¡Pago realizado exitosamente!');
        cart = []; // Vaciar el carrito después de realizar el pago
        renderCart(); // Actualizar la vista del carrito
    }
    searchButton.addEventListener('click', searchProducts);
    showAllButton.addEventListener('click', showAllProducts);

    productCards.forEach(card => {
        const addButton = card.querySelector('button');
        const productName = card.querySelector('h3').textContent.trim();
        const productPrice = card.getAttribute('data-price');

        addButton.addEventListener('click', function () {
            addToCart(productName, productPrice);
        });
    });

    checkoutButton.addEventListener('click', checkout);
});
