import { Component, signal, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith, tap } from 'rxjs/operators';
import { switchMap, of } from 'rxjs';

// Material
import { MatToolbar } from '@angular/material/toolbar';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { Card } from './card/card';
import { SearchBookService } from './services/search-book';
import { Book } from './interfaces/book';


@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatToolbar,
    Card,
    MatSelectModule,
    MatProgressBarModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  books = signal<Book[]>([]);
  loading = signal(false);

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
      tap(() => this.loading.set(true)),
      switchMap((value) => {

        if (value.trim().length !== 1) {
          return this.searchBookService.search(value);
        }

        return of([]);
      })
    ).subscribe((books: Book[]) => {
      this.books.set(books);
      this.loading.set(false);
      this.sortBooks();
    });

    this.sortControl.valueChanges.subscribe(() => {
      this.sortBooks();
    })
  }

  private sortBooks(): void {
    const clonedBooks = [...this.books()];

    switch (this.sortControl.value) {
      case 'newest':
        this.books.set(clonedBooks.sort((a, b) => b.id - a.id));
        break;
      case 'az':
        this.books.set(clonedBooks.sort((a, b) => a.title.localeCompare(b.title)));
        break;
      case 'za':
        this.books.set(clonedBooks.sort((a, b) => b.title.localeCompare(a.title)));
        break;
      default:
        break;
    }
  }
}
