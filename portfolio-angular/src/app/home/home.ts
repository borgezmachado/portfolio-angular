import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'; // Adicione este import

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatIconModule], // Adicione aqui também
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}