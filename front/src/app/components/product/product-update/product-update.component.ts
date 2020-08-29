import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from '../../header/header.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  constructor(
    private service: ProductService,
    private router: Router) {
    this.service.productData.action = this.updateProduct.bind(this);
  }

  ngOnInit(): void { }

  updateProduct(product): void {
    this.service.update(product).subscribe(() => {
      this.service.showMessage('Produto Alterado!');
      this.toProduct();
    });
  }


  toProduct(): void {
    this.router.navigate(['list-products']);
  }

}
