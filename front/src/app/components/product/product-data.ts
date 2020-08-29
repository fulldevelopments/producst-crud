import { Product } from './product.model';

export interface ProductData {
  title?: string,
  type?: string,
  label?: string,
  product?: Product,
  action?(produc: Product): void,
}