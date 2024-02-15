import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NorthKundaliDemoComponent } from './components/north-kundali-demo/north-kundali-demo.component';

export const routes: Routes = [
    {path:'', component: HomeComponent },
    {path:'home', component: HomeComponent },
    {path:'kundali-north', component: NorthKundaliDemoComponent }
];
