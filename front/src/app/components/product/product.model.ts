import { Munit } from './munit.model';

export interface Product {
  id?: number,
  name?: string,
  munit?: Munit,
  price?: number,
  qt?: number,
  perishable?: boolean,
  dtValidade?: Date,
  dtManufac?: Date
}