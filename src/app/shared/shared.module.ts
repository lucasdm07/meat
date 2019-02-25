import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component';
import { RatingComponent } from './rating/rating.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingCartService } from 'app/restaurant-detail/shopping-cart/shopping-cart.service';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { OrderService } from 'app/order/order.service';
import { SnackbarComponent } from 'app/shared/messages/snackbar/snackbar.component';
import { NotificationService } from './messages/notification.service';
import { LoginService } from 'app/security/login/login.service';
import { LoggedinGuard } from 'app/security/loggedin.guard';
import { LeaveOrderGuard } from 'app/order/leave-order.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'app/security/auth.interceptor';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent,
            CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [LeaveOrderGuard,
                  ShoppingCartService,
                  RestaurantsService,
                  OrderService,
                  NotificationService,
                  LoginService,
                  LoggedinGuard,
                  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]
    };
  }
}
