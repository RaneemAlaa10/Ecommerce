import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './Components/home/home.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductdetailsComponent } from './Components/productdetails/productdetails.component';
import { MainsliderComponent } from './Components/mainslider/mainslider.component';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HeaderInterceptorInterceptor } from './core/Interceptors/header-interceptor.interceptor';
import { CartComponent } from './Components/cart/cart.component';
import { CheckOutComponent } from './Components/check-out/check-out.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { AllordersComponent } from './Components/allorders/allorders.component';
import { LoadingComponent } from './Components/loading/loading.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { NotfoundComponent } from './Components/notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ProductdetailsComponent,
    MainsliderComponent,
    CartComponent,
    CheckOutComponent,
    WishlistComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
    BrandsComponent,
    CategoriesComponent,
    AllordersComponent,
    LoadingComponent,
    NotfoundComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    CarouselModule,
    NgxPaginationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, 
      useClass: HeaderInterceptorInterceptor, 
      multi: true 
    }


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
