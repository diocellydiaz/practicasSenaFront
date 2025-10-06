export interface Producto {
  id: number;
  title: string;
  subtitle?: string;
  price?: number;
  image: string;
  badge?: 'Nuevo' | 'Oferta' | 'Top';
  link?: string;
  stock?: number;
  date?: Date;
}


