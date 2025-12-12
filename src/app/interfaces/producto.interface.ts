// src/app/interfaces/producto.interface.ts
export interface Producto {

  // ===== Campos de la tabla en la BD =====
  productoid?: number;
  descripcion?: string;
  nombre: string;
  nombrefoto?: string;
  precio: number;
  categoriaid?: number;
  clienteid?: number;
  inventario_id?: number;
  proveedorid?: number;

  // ===== Campos usados SOLO en el front (home/promos) =====
  id?: number;
  title?: string;
  subtitle?: string;
  image?: string;
  badge?: string;
  link?: string;
}
