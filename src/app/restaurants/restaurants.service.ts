import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { Restaurant } from './restaurant/restaurant.model';
import {MEAT_API} from '../app.api';
import { Observable } from 'rxjs/Observable';
import {ErrorHandler} from '../app.error-handler';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Review } from './restaurant/restaurant.review';
import { MenuItem } from '../restaurant-detail/menu-item/menu-item.model';

@Injectable()
export class RestaurantsService {
    constructor(private http: Http) { }

    restaurants(): Observable<Restaurant[]> {
          return this.http.get(`${MEAT_API}/restaurants`)
          .map(response => response.json())
          .catch(ErrorHandler.handleError);
      }

    restauranById(id: string): Observable<Restaurant> {
          return this.http.get(`${MEAT_API}/restaurants/${id}`)
          .map(response => response.json())
          .catch(ErrorHandler.handleError);
      }

    reviewsRestaurante(restaurantId: string): Observable<Review[]> {
        return this.http.get(`${MEAT_API}/restaurants/${restaurantId}/reviews`)
        .map(response => response.json())
        .catch(ErrorHandler.handleError);
    }

    menuOfRestaurante(restaurantId: string): Observable<MenuItem[]> {
        return this.http.get(`${MEAT_API}/restaurants/${restaurantId}/menu`)
        .map(response => response.json())
        .catch(ErrorHandler.handleError);
    }
}