import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ProductsComponent } from './Components/products/products.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { ValuesComponent } from './Components/values/values.component';
import { VisionComponent } from './Components/vision/vision.component';
import { ProductDetialsComponent } from './Components/product-detials/product-detials.component';
import { LoginComponent } from './Components/login/login.component';
import { authUserOnProductsGuard } from './Guards/auth-user-on-products.guard';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { SignupComponent } from './Components/signup/signup.component';
import { UsersComponent } from './Components/users/users.component';
// Routing
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  //   Nested routing
  {
    path: 'aboutUs',
    component: AboutUsComponent,
    children: [
      { path: '', redirectTo: 'vision', pathMatch: 'full' },
      { path: 'values', component: ValuesComponent },
      { path: 'vision', component: VisionComponent },
    ],
  },
  {
    path: 'product',
    // lazy loading
    loadComponent: () =>
      import('./Components/products/products.component').then(
        (obj) => obj.ProductsComponent
      ),
    // use guard to ensure that the user is logged in
    canActivate: [authUserOnProductsGuard],
  },
  { path: 'product/:idProd', component: ProductDetialsComponent },
  { path: 'signIn', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'users',
    loadComponent: () =>
      import('./Components/users/users.component').then(
        (obj) => obj.UsersComponent
      ),
    canActivate: [authUserOnProductsGuard],
  },

  { path: 'addNewProduct', component: AddProductComponent },

  { path: '**', component: NotFoundComponent },
];
