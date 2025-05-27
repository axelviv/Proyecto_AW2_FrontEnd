
import { API } from "./api.js";

export async function finalizarCompra() {
    try {
        const respuesta = await fetch(`${API}/api/ventas/hola`);
        const data = await respuesta.text();
        return data;
    } catch (error) {
        console.error('Error al finalizar compra:', error);
        throw error;
    }
}