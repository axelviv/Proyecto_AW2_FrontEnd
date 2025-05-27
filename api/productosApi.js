
import { API } from "./api.js";

export const getProductos = async () => {
    try {
        const res = await fetch(`${API}/api/productos/all`, {
            method: 'GET'
        });

        if (!res.ok) {
            throw new Error(`Error en la respuesta: ${res.status}`);
        }

        const data = await res.json(); //Parseamos JSON
        return data; //Devolvemos los datos

    } catch (error) {
        console.error('Error al obtener productos:', error);
        return null;
    }
};