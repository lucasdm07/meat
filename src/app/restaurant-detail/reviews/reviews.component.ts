import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../../restaurants/restaurants.service';
import { ActivatedRoute } from '@angular/router';
import { Review } from '../../restaurants/restaurant/restaurant.review';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<any>

  constructor(private restaurantsService: RestaurantsService, private route: ActivatedRoute ) { } 

  ngOnInit() {
    this.reviews = this.restaurantsService.reviewsRestaurante(this.route.parent.snapshot.params['id'])
  }

}
