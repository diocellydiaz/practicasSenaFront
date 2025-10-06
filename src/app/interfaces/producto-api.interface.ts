export interface ProductoApi {
  id_producto: number;
  nombre: string;
  precio: number;
  stock: number;
  fecha_fabricacion?: string | Date;
  image?: string;
  categoria?: string;
  descripcion?: string;
}
