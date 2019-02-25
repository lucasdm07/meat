import {Injectable} from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import {MEAT_API} from '../app.api';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Review } from './restaurant/restaurant.review';
import { MenuItem } from '../restaurant-detail/menu-item/menu-item.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class RestaurantsService {
    constructor(private http: HttpClient) { }

    restaurants(search?: string): Observable<Restaurant[]> {
        let params: HttpParams;

        if (search) {
            params = new HttpParams().append('q', search);
        }

        return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, {params: params});
      }

      restaurantById(id: string): Observable<Restaurant> {
        return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`);
      }

      reviewsOfRestaurant(restaurantId: string): Observable<Review[]> {
        console.log('reviewsRestaurante');
        return this.http.get<Review[]>(`${MEAT_API}/restaurants/${restaurantId}/reviews`);
    }

    menuOfRestaurante(restaurantId: string): Observable<MenuItem[]> {
        return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${restaurantId}/menu`);
    }
}
