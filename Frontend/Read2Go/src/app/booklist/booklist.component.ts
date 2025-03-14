import { Component, OnInit } from '@angular/core';
import { BooklistheadComponent } from '../booklisthead/booklisthead.component';
import { BooklistbodyComponent } from '../booklistbody/booklistbody.component';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booklist',
  imports: [BooklistheadComponent, BooklistbodyComponent, CommonModule],
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css'],
})
export class BooklistComponent implements OnInit {
  queryParams: Params = {};
  category: string | undefined = undefined;
  filter: string | undefined = undefined;
  option: string | undefined = undefined;
  search: string | undefined = undefined;
  books: {
    genre: string;
    id: number;
    title: string;
    coverUrl: string;
    link: string;
    state: string;
    author: string;
    rating: number;
    description: string;
    published: number;
  }[] = [];
  originalBooks: {
    genre: string;
    id: number;
    title: string;
    coverUrl: string;
    link: string;
    state: string;
    author: string;
    rating: number;
    description: string;
    published: number;

  }[] = [];

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.route.queryParams.subscribe((params) => {
      this.queryParams = params;
    });
  }

  update(category: string): void {}

  async ngOnInit(): Promise<void> {
    console.log("fetching books");
    const fetchedBooks = await this.authService.getBooks('');
    console.log("fetched books: ", fetchedBooks[0].state);
    this.originalBooks = fetchedBooks.map((b) => ({
      genre: b.genre,
      id: b.id,
      title: b.title,
      coverUrl: b.image, // Assuming 'image' is the correct field for coverUrl
      link: b.title.replaceAll(' ', '+').toLowerCase(),
      state: b.state,
      author: b.author,
      rating: b.rating,
      description: b.description,
      published: Number(b.published),
    }));
    console.log("fetch published: ", this.originalBooks[0]);

    localStorage.setItem('books', JSON.stringify(this.originalBooks));

    this.books = [...this.originalBooks];
    this.search = this.queryParams['search'];

    if (this.queryParams['category']) {
      this.category = this.queryParams['category'];
      this.books = this.books.filter((b) => b.state == this.category);
    }

    if (this.queryParams['filter']) {
      this.filter = this.queryParams['filter'];
      if (this.filter == 'author') {
        this.books = this.books
          .sort((a, b) => a.author.localeCompare(b.title))
          .filter((b) =>
            b.author.toLowerCase().startsWith(this.search?.toLowerCase() || '')
          );
      } else if (this.filter == 'genre') {
        this.books = this.books
          .sort((a, b) => a.genre.localeCompare(b.title))
          .filter((b) =>
            b.genre.toLowerCase().startsWith(this.search?.toLowerCase() || '')
          );
      } else if (this.filter == 'title' || this.filter == 'rating') {
        this.books = this.books
          .sort((a, b) => a.title.localeCompare(b.title))
          .filter((b) =>
            b.title.toLowerCase().startsWith(this.search?.toLowerCase() || '')
          );
      }

      if (this.filter == 'rating') {
        this.books.sort((a, b) => b.rating - a.rating);
      }
    } else if (this.search != undefined) {
      this.books = this.books.filter((b) =>
        b.title.toLowerCase().includes(this.search?.toLowerCase() || '')
      );
    }

    if (this.queryParams['direction']) {
      if (this.queryParams['direction'] == 'desc') {
        this.books.reverse();
      }
    }

  }
}
