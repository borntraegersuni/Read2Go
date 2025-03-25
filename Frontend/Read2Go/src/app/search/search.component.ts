import { Component } from '@angular/core';
import { SearchheadComponent } from "../searchhead/searchhead.component";
import { SearchbodyComponent } from "../searchbody/searchbody.component";
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-search',
  imports: [SearchheadComponent, SearchbodyComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
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
    author: string;
    rating: number;
    published: number;
    description: string;
  }[] = [];
  originalBooks: {
    genre: string;
    id: number;
    title: string;
    coverUrl: string;
    link: string;
    author: string;
    rating: number;
    published: number;
    description: string;
  }[] = [];

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.route.queryParams.subscribe((params) => {
      this.queryParams = params;
    });
  }

  update(category: string): void {}

  async ngOnInit(): Promise<void> {
    const fetchedBooks = await this.authService.getAllBooks();
    this.originalBooks = fetchedBooks.map((b) => ({
      genre: b.genre,
      id: b.id,
      title: b.title,
      coverUrl: b.image, // Assuming 'image' is the correct field for coverUrl
      link: b.title.replaceAll(' ', '+').toLowerCase(),
      author: b.author,
      rating: b.rating,
      description: b.description ? b.description : '',
      published: b.publishedYear,

    }));
    localStorage.setItem('books', JSON.stringify(this.originalBooks));

    this.books = [...this.originalBooks];
    this.search = this.queryParams['search'];

    if (this.queryParams['filter']) {
      this.filter = this.queryParams['filter'];
      if (this.filter == 'author') {
        this.books = this.books
          .sort((a, b) => a.author.localeCompare(b.author))
          .filter((b) =>
            b.author.toLowerCase().startsWith(this.search?.toLowerCase() || '')
          );
      } else if (this.filter == 'genre') {
        this.books = this.books
          .sort((a, b) => a.genre.localeCompare(b.genre))
          .filter((b) =>
            b.genre.toLowerCase().includes(this.search?.toLowerCase() || '')
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

    console.log(this.books.length);
  }
}
