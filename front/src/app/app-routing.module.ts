import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCrudComponent } from './views/product-crud/product-crud.component';
import { ListProductsComponent } from './views/list-products/list-products.component';
import { HomeComponent } from './views/home/home.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "product/crud",
    component: ProductCrudComponent
  },
  {
    path: "list-products",
    component: ListProductsComponent
  },
  {
    path: "product/create/",
    component: ProductCreateComponent
  },
  {
    path: "product/update/:id",
    component: ProductUpdateComponent
  },
  {
    path: "product/delete/:id",
    component: ProductDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
