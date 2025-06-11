
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const contraseña = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/usuarios/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                apellido: apellido,
                email: email,
                contraseña: contraseña
            })
        });

        const data = await response.json();
        console.log("Respuesta del backend:", data);

        if (data.status) {

            alert("Usuario registrado exitosamente.");

            window.location.href = './login.html';

        } else {
            alert("No se pudo registrar el usuario, intenta con otro email.");
        }

    } catch (error) {
        console.error('Error en el registro:', error);
        alert("Error al conectar con el servidor.");
    }
});
