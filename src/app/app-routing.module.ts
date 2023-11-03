import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { authGuard } from './core/Guards/auth.guard';
import { ProductdetailsComponent } from './Components/productdetails/productdetails.component';
import { CartComponent } from './Components/cart/cart.component';
import { CheckOutComponent } from './Components/check-out/check-out.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { AllordersComponent } from './Components/allorders/allorders.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "register", component: RegisterComponent, data: { animation: 'register' } },
  { path: "login", component: LoginComponent, data: { animation: 'login' } },
  { path: "resetPassword", component: ResetPasswordComponent },
  { path: "forgetPassword", component: ForgetPasswordComponent },
  { path: "home", canActivate: [authGuard], component: HomeComponent },
  { path: "categories", canActivate: [authGuard], component: CategoriesComponent },
  { path: "allorders", canActivate: [authGuard], component: AllordersComponent },
  { path: "cart", canActivate: [authGuard], component: CartComponent },
  { path: "wishlist", canActivate: [authGuard], component: WishlistComponent },
  { path: "brands", canActivate: [authGuard], component: BrandsComponent },
  { path: "checkout/:cartId", canActivate: [authGuard], component: CheckOutComponent },
  { path: "productdetails/:id", canActivate: [authGuard], component: ProductdetailsComponent },
  { path: "**", component: NotfoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
