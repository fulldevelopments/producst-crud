import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/components/header/header.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  constructor(private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Lista Itens',
      icon: 'view_list',
      routeUrl: 'list-products'
    };
  }

  ngOnInit(): void {
  }

}
