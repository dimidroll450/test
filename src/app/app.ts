import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

// Material
import { MatToolbar } from '@angular/material/toolbar';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';

import { Card } from './card/card';


@Component({
  selector: 'app-root',
  imports: [
    // RouterOutlet, 
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatToolbar,
    Card
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('test');

  searchFormBook = new FormControl('');
}
