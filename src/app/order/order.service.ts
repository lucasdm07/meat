import { Injectable } from '@angular/core';
import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service';
import { Order } from './order.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { MEAT_API } from '../app.api';
import { LoginService } from 'app/security/login/login.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.module';

@Injectable()
export class OrderService {

  constructor(private cartService: ShoppingCartService, private http: HttpClient) { }

   cartItems(): CartItem[] {
      return this.cartService.items;
   }

   increaseQty(item: CartItem) {
     this.cartService.increaseQty(item);
   }

   decreaseQty(item: CartItem) {
     this.cartService.decreaseQty(item);
   }
   remove(item: CartItem) {
      this.cartService.removeItem(item);
   }

  itemsValue(): number {
    return this.cartService.total();
  }

  checkOrder(order: Order): Observable<string> {
    return this.http.post<Order>(`${MEAT_API}/orders`, order).map(item => item.id);
  }

  clear() {
    this.cartService.clear();
  }
}
