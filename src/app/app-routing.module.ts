import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { ProfileComponent } from './profile/profile.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { MycartComponent } from './mycart/mycart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { authGuardGuard } from './auth-guard.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CheckoutComponent } from './checkout/checkout.component';
const routes: Routes = [
  {path:'',redirectTo:'signin',pathMatch:'full'},
  {path:'brands',canActivate:[authGuardGuard],component:BrandsComponent},
  {path:'categories',canActivate:[authGuardGuard],component:CategoriesComponent},
  {path:'footer',canActivate:[authGuardGuard],component:FooterComponent},
  {path:'home',canActivate:[authGuardGuard],component:HomeComponent},
  {path:'navbar',canActivate:[authGuardGuard],component:NavbarComponent},
  {path:'products',canActivate:[authGuardGuard],component:ProductsComponent},
  {path:'productDetails/:id',canActivate:[authGuardGuard],component:ProductDetailsComponent},
  {path:'cart',canActivate:[authGuardGuard],component:MycartComponent},
  {path:'profile',canActivate:[authGuardGuard],component:ProfileComponent},
  {path:'checkout',canActivate:[authGuardGuard],component:CheckoutComponent},
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent},
  {path:'forgotPassword',component:ForgotPasswordComponent},
  {path:'resetPassword',component:ResetPasswordComponent},
  {path:'wishlist',canActivate:[authGuardGuard],component:WishlistComponent},
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
