import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-projetos',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './projetos.html',
  styleUrl: './projetos.css'
})
export class Projetos {}