import { Component, signal, OnInit } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { switchMap } from 'rxjs';

// Material
import { MatToolbar } from '@angular/material/toolbar';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';

import { Card } from './card/card';
import { SearchBookService } from './search-book';

interface Book {
  id: number;
  title: string;
  description: string;
};

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
export class App implements OnInit {
  protected readonly title = signal('test');
  books: Book[] = [];
  book: string = '';

  searchFormBook = new FormControl('');

  constructor(
    private searchBookService: SearchBookService
  ) {}

  ngOnInit() {
    this.searchFormBook.valueChanges.pipe(
      debounceTime(200),
      // distinctUntilChanged(),
      switchMap((value) => {
        this.book = value || '';

        if (value && value.trim().length > 1) {
          return this.searchBookService.search(value);
        } else {
          return [];
        }
      })
    ).subscribe((books: Book[]) => {
      this.books = books;
    });
  }
}
