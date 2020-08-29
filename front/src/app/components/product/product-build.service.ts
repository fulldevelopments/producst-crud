import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from '../header/header.service';



@Injectable({
  providedIn: 'root',
})
export class ProductBuildService {

  constructor(private service: ProductService,
    private headerService: HeaderService) {
  }


  buildForm({ title, icon, routeUrl, type, label, id }): Promise<any> {

    const promise = new Promise(resolve => {

      this.headerService.headerData = {
        title,
        icon,
        routeUrl
      };

      if (id) {
        this.service.readById(id).subscribe(product => {
          product.dtManufac = new Date(product.dtManufac);
          product.dtValidade = new Date(product.dtValidade);
          this.setProduct(product, title, type, label);
          resolve();
        });
      } else {
        this.setProduct({ price: 0, qt: 0, perishable: false }, title, type, label);
        resolve();
      }

    })

    return promise;

  }

  setProduct(product, title, type, label) {
    this.service.productData = {
      title,
      product: product,
      type,
      label,
    }
  }

}