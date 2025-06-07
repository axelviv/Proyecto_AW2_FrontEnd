
const url = 'http://127.0.0.1:5500/'

export function cerrarSesion() {
    setTimeout(() => {

        const logoutButton = document.getElementById('logout');

        logoutButton.addEventListener('click', function () {

            // Eliminar usuario logueado de sessionStorage
            sessionStorage.removeItem('nombreUsuario');
            sessionStorage.removeItem('token');
            localStorage.removeItem('carrito');
            window.location.href = `${url}pages/users/login.html`;

            alert('Sesion Finalizada!.');
        });


    }, 100); // Esperar 100 ms
}