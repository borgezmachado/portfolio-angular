// src/app/sobre/sobre.ts

import { Component } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-sobre',

  standalone: true,

  imports: [
    MatCardModule,
    MatIconModule,
  ],

  templateUrl: './sobre.html',

  styleUrl: './sobre.css'
})
export class Sobre {

}