import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contato',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './contato.html',
  styleUrl: './contato.css'
})
export class Contato {}