import * as Big from "big.js";

export class Producto {
    id_producto!: number;
    nombre!: string;
    precio!: Big; // Define el tipo como Big
    stock!: number;
    fecha_fabricacion!: Date;
    id_cliente?: number;
    foto?: string;

    constructor(id_producto: number, nombre: string, precio: string, stock: number, fecha_fabricacion: Date, id_cliente?: number, foto?: string) {
        this.id_producto = id_producto;
        this.nombre = nombre;
        this.precio = new Big(precio); // Inicializa el precio con Big
        this.stock = stock;
        this.fecha_fabricacion = fecha_fabricacion;
        this.id_cliente = id_cliente;
        this.foto = foto;
    }
}
