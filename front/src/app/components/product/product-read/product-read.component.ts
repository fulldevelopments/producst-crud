import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductsListDataSource } from './products-list-datasource';
import { Product } from '../product.model';
import { ProductBuildService } from './../product-build.service';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Product>;
  dataSource: ProductsListDataSource;

  displayedColumns = ['id', 'name', 'qt', 'munit', 'price', 'dtvalidade', 'dtManufac', 'action'];
  pageSize: number;
  constructor(private service: ProductService,
    private productBuildService: ProductBuildService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.pageSize = 10;
  }

  ngAfterViewInit() {
    this.service.read().subscribe(products => {
      this.dataSource = new ProductsListDataSource(products);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    });
  }

  enumRoute(id) {
    return {
      'update': {
        id,
        title: 'Atualizar Produto',
        icon: 'update',
        routeUrl: 'list-products',
        type: 'warning',
        label: 'Atualizar'
      },
      'delete': {
        id,
        title: 'Excluir Produto',
        icon: 'delete',
        routeUrl: 'list-products',
        type: 'danger',
        label: 'Excluir'
      },
      'crud': {
        title: 'Novo Produto',
        routeUrl: 'list-products',
        type: 'success',
        label: 'Salvar'
      }

    }
  }

  getRoute(type, id): void {
    this.productBuildService.buildForm(this.enumRoute(id)[type]).then(()=>{
      this.router.navigate([`/product/${type}/${id ? id : ''}`]);
    })
  }

  toListProduct() {
    this.router.navigate(['list-products']);
  }

}
