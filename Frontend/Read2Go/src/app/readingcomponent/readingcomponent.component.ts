import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-readingcomponent',
  imports: [CommonModule],
  templateUrl: './readingcomponent.component.html',
  styleUrl: './readingcomponent.component.css',
})
export class ReadingcomponentComponent {
  books: { title: string, coverUrl: string, link: string }[] = [];

    constructor(
      private authService: AuthService
    ) {}
  async ngOnInit() {
    try {
      const books = await this.authService.getBooks("reading");
      if (books && Array.isArray(books)) {
        this.books = books.map(book => {
          console.log('Book from API:', book); // Debug to check actual data structure
          return {
            title: book.title,
            coverUrl: book.image && book.image !== "" ? book.image : "./examplecover.jpg",
            link: book.title.toLowerCase().replaceAll(" ", "+")
          };
        });
      } else {
        console.error('Invalid data format received from the backend');
        this.books = [];
      }
    } catch (error) {
      console.error('Error fetching books from backend:', error);
      this.books = [];
    }
  }
}
