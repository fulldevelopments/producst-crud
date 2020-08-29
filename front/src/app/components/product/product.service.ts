import { Injectable } from '@angular/core';
import { MsgService } from './../message/msg.service';
import { HttpClient } from '@angular/common/http';
import { Product } from './../product/product.model';
import { Observable, EMPTY, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProductData } from './product-data';

const url = 'http://localhost:3001/products';


@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private _productData = new BehaviorSubject<ProductData>({
    title: 'Novo Produto',
    type: 'NEW',
    product: {
      name: '',
      munit: {},
      price: 0,
      qt: 0,
      perishable: false,
      dtValidade: null,
      dtManufac: null
    },
    label: 'Salvar',
    action: () => { }
  });

  constructor(public msg: MsgService, private http: HttpClient) {
  }

  get productData(): ProductData {
    return this._productData.value;
  }

  set productData(productData: ProductData) {
    this._productData.next(productData);
  }

  getUrl(id): string {
    return `${url}/${id}`;
  }

  showMessage(msg: string): void {
    this.msg.showSuccess(msg);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(url, product).pipe(map(obj => obj), catchError(e => this.errorHandler(e, 'ao tentar criar um novo produto!')));
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(url);
  }

  readById(id: string): Observable<Product> {
    return this.http.get<Product>(this.getUrl(id));
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(this.getUrl(product.id), product).pipe(map(obj => obj), catchError(e => this.errorHandler(e, 'ao tentar atualizar o produto!')));
  }

  delete(product: Product): Observable<Product> {
    return this.http.delete<Product>(this.getUrl(product.id)).pipe(map(obj => obj), catchError(e => this.errorHandler(e, 'ao tentar deletar o produto')));
  }

  errorHandler(e: any, msg: string): Observable<any> {
    this.msg.showError(`${e.message} ${msg}`);
    return EMPTY;
  }

}
