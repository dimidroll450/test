import { Component, signal, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { switchMap } from 'rxjs';

// Material
import { MatToolbar } from '@angular/material/toolbar';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

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
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatToolbar,
    Card,
    MatSelectModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('test');
  books: Book[] = [];

  searchFormBook = new FormControl('', { nonNullable: true });
  sortControl = new FormControl<'az' | 'za' | 'newest'>('newest');


  constructor(
    private searchBookService: SearchBookService
  ) {}

  ngOnInit() {
    this.searchFormBook.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => {

        // if (value && value.trim().length > 1) {
          return this.searchBookService.search(value);

      })
    ).subscribe((books: Book[]) => {
      this.books = books;
      this.sortBooks();
    });

    this.sortControl.valueChanges.subscribe(() => {
      this.sortBooks();
    })
  }

  private sortBooks(): void {
    const clonedBooks = [...this.books];

    switch (this.sortControl.value) {
      case 'newest':
        this.books = clonedBooks.sort((a, b) => b.id - a.id);
        break;
      case 'az':
        this.books = clonedBooks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'za':
        this.books = clonedBooks.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
  }
}
