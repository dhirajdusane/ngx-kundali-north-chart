import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-north-kundali-demo',
  standalone: true,
  imports: [MatTabsModule,MatCardModule],
  templateUrl: './north-kundali-demo.component.html',
  styleUrl: './north-kundali-demo.component.sass'
})
export class NorthKundaliDemoComponent {

}
