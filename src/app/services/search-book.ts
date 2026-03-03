import { Injectable } from '@angular/core';
import { of, shareReplay, delay, map } from 'rxjs';

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
  },
  {
    id: 4,
    title: "Moby-Dick",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, perspiciatis."
  },
  {
    id: 5,
    title: "Pride and Prejudice",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, recusandae."
  },
  {
    id: 6,
    title: "War and Peace",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, dignissimos."
  },
  {
    id: 7,
    title: "The Catcher in the Rye",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, vero."
  },
  {
    id: 8,
    title: "Brave New World",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, aliquid."
  },
  {
    id: 9,
    title: "The Hobbit",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, exercitationem."
  },
  {
    id: 10,
    title: "Crime and Punishment",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, architecto."
  },
  {
    id: 11,
    title: "The Lord of the Rings",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, dolorem."
  },
  {
    id: 12,
    title: "Jane Eyre",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, tempora."
  },
  {
    id: 13,
    title: "The Alchemist",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, magnam."
  },
  {
    id: 14,
    title: "The Picture of Dorian Gray",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, assumenda."
  },
  {
    id: 15,
    title: "Fahrenheit 451",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, iste."
  },
  {
    id: 16,
    title: "The Chronicles of Narnia",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, beatae."
  },
  {
    id: 17,
    title: "The Shining",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, dicta."
  },
  {
    id: 18,
    title: "Dracula",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, earum."
  },
  {
    id: 19,
    title: "The Odyssey",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, laborum."
  },
  {
    id: 20,
    title: "Les Misérables",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, explicabo."
  }
];

@Injectable({
  providedIn: 'root',
})
export class SearchBookService {
  private readonly all$ = of(BOOKS).pipe(
    delay(3000),
    shareReplay(1));

  search(value: string) {
    const normalizedValue = value.trim().toLowerCase();

    return this.all$.pipe(
      map(books => {
        if (normalizedValue.length === 0) {
          return books;
        }

        return books.filter(book => book.title.toLowerCase().includes(normalizedValue));
      })
    )
  }
}
