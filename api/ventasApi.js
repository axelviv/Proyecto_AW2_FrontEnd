
import { API } from "./api.js";

export const nuevaVenta = async (ventaData) => {
    try {
        const res = await fetch(`${API}/api/ventas/nueva`, {
            method: "POST",
            body: JSON.stringify(ventaData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok) {
            throw new Error(`Error al registrar la venta: ${res.status}`);
        }

        const data = await res.json(); // Se espera que el backend devuelva un mensaje o los datos de la venta
        return data;
    } catch (error) {
        console.error("Error al registrar la venta:", error);
        return null;
    }
};
