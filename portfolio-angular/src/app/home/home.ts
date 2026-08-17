import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  currentYear = new Date().getFullYear();

}