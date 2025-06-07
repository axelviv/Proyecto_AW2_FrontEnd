
import { API } from "./api.js";

export const nuevaVenta = async (ventaData) => {
    try {
        const token = sessionStorage.getItem('token');

        const res = await fetch(`${API}/api/ventas/nueva`, {
            method: "POST",
            body: JSON.stringify(ventaData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!res.ok) {
            throw new Error(`Error al registrar la venta: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error al registrar la venta:", error);
        return null;
    }
};
