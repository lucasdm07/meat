import {Routes} from '@angular/router';
import { HomeComponent } from 'app/home/home.component';
import { RestaurantsComponent } from 'app/restaurants/restaurants.component';
import { RestaurantDetailComponent } from 'app/restaurant-detail/restaurant-detail.component';
import { ReviewsComponent } from 'app/restaurant-detail/reviews/reviews.component';
import { MenuComponent } from 'app/restaurant-detail/menu/menu.component';
import { OrderSummaryComponent } from 'app/order-summary/order-summary.component';
import { NotFoundComponent } from 'app/not-found/not-found.component';
import { LoginComponent } from 'app/security/login/login.component';
import { LoggedinGuard } from 'app/security/loggedin.guard';

export const ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login/:to', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    // esse era o jeito antigo antes do carregamento tardio {path: 'about', component: AboutComponent},
    {path: 'about', loadChildren: './about/about.module#AboutModule'},
    {path: 'restaurants', component: RestaurantsComponent},
    {path: 'order-summary', component: OrderSummaryComponent},
    {path: 'restaurantsDetail/:id', component: RestaurantDetailComponent,
        children: [
            {path: '', redirectTo: 'menu', pathMatch: 'full'},
            {path: 'menu', component: MenuComponent},
            {path: 'reviews', component: ReviewsComponent}
        ]
    },
    // {path: 'order', component: OrderComponent}
    {path: 'order', loadChildren: './order/order.module#OrderModule', canLoad: [LoggedinGuard], canActivate: [LoggedinGuard]},
    {path: '**', component: NotFoundComponent}
];
