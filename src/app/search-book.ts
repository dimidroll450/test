import { Injectable } from '@angular/core';
import { of, shareReplay } from 'rxjs';

interface Book {
  id: number;
  title: string;
  description: string;
};

const BOOKS: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, eveniet."
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, eveniet."
  },
  {
    id: 3,
    title: "1984",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, eveniet."
  }
];

@Injectable({
  providedIn: 'root',
})
export class SearchBookService {
  private readonly all$ = of(BOOKS).pipe(shareReplay(1));

  search(value: string) {
    return this.all$;
  }
}
