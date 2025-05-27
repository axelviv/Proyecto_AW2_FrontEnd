/* Apis */
import { getProductos } from '../api/productosApi.js';

/* Components */
import { navBarComponent } from "../Components/navBar.js"
import { cardComponent } from "../Components/cards.js"
import { cerrarSesion } from "./users/logout.js"



/* NavBar */
let navContainer = document.querySelector('header')

window.addEventListener('load', () => {

    navContainer.innerHTML = navBarComponent


    /* -----------------------Bienvenida al user----------------------------- */
    //Recuperar el usuario logueado desde sessionStorage
    const logueado = JSON.parse(sessionStorage.getItem('usuarioLogueado'));

    //Para seleccionar los enlaces del navbar y el boton de cerrar sesion
    const loginLink = document.getElementById('login-link'); // Enlace de "Ingresar"
    const registerLink = document.getElementById('register-link'); // Enlace de "Registrarse"
    const botonLogout = document.getElementById('logout'); // Botón de "Cerrar Sesión"

    if (logueado) {

        const mensajeBienvenida = document.getElementById('bienvenida');
        //Mostrar mensaje de bienvenida en el navbar
        if (mensajeBienvenida) {
            mensajeBienvenida.textContent = `Bienvenido, ${logueado.nombre}`;
        }

        //Ocultar los enlaces en el navbar
        if (loginLink) {
            loginLink.style.display = 'none';
        }

        if (registerLink) {
            registerLink.style.display = 'none';
        }

        //Mostrar el boton de Cerrar Sesion en el navbar
        if (botonLogout) {
            botonLogout.style.display = 'inline-block';
        }

    } else {

        console.log('No hay ningún usuario logueado.');
    }




    /* Cerrar Sesion */
    cerrarSesion();



    /* -----------------------Cards----------------------------- */

    let cardContainerProductos = document.querySelector('#card-productos');

    (async () => {
        try {
            const data = await getProductos();
            if (!data) throw new Error("No se pudo cargar productos");

            const selectFiltro = document.getElementById('filtro-categoria');

            const productosPorCategoria = {
                libros: data.cardsElementsProductos.libros,
                señaladores: data.cardsElementsProductos.señaladores,
                fundas: data.cardsElementsProductos.fundas
            };

            const todosLosProductos = [
                ...productosPorCategoria.libros,
                ...productosPorCategoria.señaladores,
                ...productosPorCategoria.fundas
            ];

            //Funcion para mezclar productos
            function mezclarArray(array) {
                return array.sort(() => Math.random() - 0.5);
            }

            let productosMezclados = mezclarArray(todosLosProductos);

            function renderProductos(lista) {
                cardContainerProductos.innerHTML = cardComponent(lista);
            }

            //Mostrar todos los productos al cargar
            renderProductos(productosMezclados);

            //Mostrar productos por categoría
            selectFiltro.addEventListener('change', (e) => {
                const valor = e.target.value;

                if (valor === 'todos') {
                    renderProductos(productosMezclados);
                } else {
                    renderProductos(mezclarArray(productosPorCategoria[valor]));
                }
            });

        } catch (error) {
            console.error('Error al cargar productos:', error);
        }
    })();


    /* -----------------------Listado----------------------------- */
    (async () => {
        try {
            const data = await getProductos();

            const tabla = document.getElementById("tabla-productos");
            if (!tabla) return;

            if (!data) throw new Error('No se recibieron datos de productos');

            const productosPorCategoria = data.cardsElementsProductos;

            let filas = '';

            Object.values(productosPorCategoria).forEach(categoria => {
                categoria.forEach(producto => {
                    filas += `
          <tr>
            <td>${producto.title}</td>
            <td>${producto.price}</td>
          </tr>
        `;
                });
            });

            tabla.innerHTML = filas;
        } catch (error) {
            console.error("Error al cargar productos:", error);
        }
    })();


})





