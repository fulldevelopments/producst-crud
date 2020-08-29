import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { MsgService } from '../../message/msg.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  productToDelete;

  constructor(
    private service: ProductService,
    private msg: MsgService,
    private router: Router) {
    this.service.productData.action = this.askToDelete.bind(this);
  }

  ngOnInit(): void {
    this.msg._confirmEvent.subscribe(
      (response) => {
        if (response && this.productToDelete) {
          this.deleteProduct();
        }
      }
    );
  }

  toListProduct(): void {
    this.router.navigate(['list-products']);
  }

  askToDelete(product: Product): void {
    this.productToDelete = product;
    this.msg.showConfirm('Deseja Excluir o registro selecionado?');
  }

  deleteProduct(): void {
    if (this.productToDelete) {
      const nameProduct = this.productToDelete.name;
      this.service.delete(this.productToDelete).subscribe(() => {
        this.msg.showWarn(`Produto ${nameProduct} Deletado! `);
        this.productToDelete = null;
        this.toListProduct();
      });
    }
  }


  cancel(): void {
    this.toListProduct();
  }

}
