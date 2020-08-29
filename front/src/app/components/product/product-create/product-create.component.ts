import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { MsgService } from '../../message/msg.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {

  constructor(private productService: ProductService,
    public msgService: MsgService,
    private router: Router) {
    this.productService.productData.action = this.createProduct.bind(this)
  }

  ngOnInit(): void { }

  createProduct(product): void {
    this.productService.create(product).subscribe(() => {
      this.msgService.showSuccess('Produto Criado!');
      this.toProduct();
    });
  }

  toProduct(): void {
    this.router.navigate(['list-products']);
  }

}
