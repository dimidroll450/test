import { Component, Input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { HighlightPipe } from '../pipes/highlight-pipe';

@Component({
  selector: 'app-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    HighlightPipe
  ],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {

  @Input() bookTitle = '';
  @Input() bookDescription = '';
  @Input() searchValue = '';
}
