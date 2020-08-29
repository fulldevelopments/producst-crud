import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/components/header/header.service';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css']
})
export class ProductCrudComponent implements OnInit {

  constructor(private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Cadastrar',
      icon: 'create',
      routeUrl: 'product/crud'
    };
  }

  ngOnInit(): void {
  }



}
