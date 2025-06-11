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
    //Recuperar el nombre y apellido del usuario logueado desde sessionStorage
    const nombre = sessionStorage.getItem('nombreUsuario');
    const apellido = sessionStorage.getItem('apellidoUsuario');

    //Para seleccionar los enlaces del navbar y el boton de cerrar sesion
    const loginLink = document.getElementById('login-link'); // Enlace de "Ingresar"
    const registerLink = document.getElementById('register-link'); // Enlace de "Registrarse"
    const botonLogout = document.getElementById('logout'); // Botón de "Cerrar Sesión"

    if (nombre && apellido) {

        const mensajeBienvenida = document.getElementById('bienvenida');
        //Mostrar mensaje de bienvenida en el navbar
        if (mensajeBienvenida) {
            mensajeBienvenida.textContent = `Bienvenido, ${nombre} ${apellido}`;
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
    if (cardContainerProductos) {
        (async () => {
            try {
                const data = await getProductos();
                if (!data || !Array.isArray(data)) throw new Error("No se pudo cargar productos");

                const selectFiltro = document.getElementById('filtro-categoria');

                // Filtrar productos por categoría usando la propiedad Category
                const productosPorCategoria = {
                    libros: data.filter(p => p.Category === 'libros'),
                    señaladores: data.filter(p => p.Category === 'señaladores'),
                    fundas: data.filter(p => p.Category === 'fundas')
                };

                const todosLosProductos = data

                // Función para mezclar productos
                function mezclarArray(array) {
                    return array.sort(() => Math.random() - 0.5);
                }

                let productosMezclados = mezclarArray(todosLosProductos);

                function renderProductos(lista) {
                    cardContainerProductos.innerHTML = cardComponent(lista);
                }

                // Mostrar todos los productos al cargar
                renderProductos(productosMezclados);

                // Mostrar productos por categoría
                selectFiltro.addEventListener('change', (e) => {
                    const valor = e.target.value;

                    if (valor === 'todos') {
                        renderProductos(productosMezclados);
                    } else {
                        renderProductos(mezclarArray(productosPorCategoria[valor] || []));
                    }
                });

            } catch (error) {
                console.error('Error al cargar productos:', error);
            }
        })();
    }


    /* -----------------------Listado----------------------------- */
    (async () => {
        try {
            const data = await getProductos();

            const tabla = document.getElementById("tabla-productos");
            if (!tabla) return;

            if (!data || !Array.isArray(data)) throw new Error('No se recibieron datos de productos');

            let filas = '';

            data.forEach(producto => {
                filas += `
          <tr>
            <td>${producto.title}</td>
            <td>${producto.price}</td>
          </tr>
        `;
            });

            tabla.innerHTML = filas;
        } catch (error) {
            console.error("Error al cargar productos:", error);
        }
    })();



})





