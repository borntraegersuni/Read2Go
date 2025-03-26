import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookoverviewComponent } from '../bookoverview/bookoverview.component';
import { AuthService } from '../services/auth.service';

/**
 * ReadingcomponentComponent displays a list of books that the user has marked as "reading".
 * It fetches the user's reading list and corresponding book details from the AuthService,
 * and provides functionality to open and close popups for each book. The component tracks
 * changes made in the popup and can trigger a page reload when necessary.
 */
@Component({
  selector: 'app-readingcomponent',
  standalone: true,
  imports: [CommonModule, BookoverviewComponent],
  templateUrl: './readingcomponent.component.html',
  styleUrl: './readingcomponent.component.css'
})
export class ReadingcomponentComponent implements OnInit {
  books: Array<{
    id: number;
    title: string;
    author: string;
    coverUrl: string;
    link: string;
    rating: number;
    genre: string;
    description: string;
    publishedYear: number;
    state?: string;
  }> = [];

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    try {
      const userBooks = await this.authService.getBooks('reading');
      
      const allBooks = await this.authService.getAllBooks();
      
      if (userBooks && userBooks.length > 0) {
        const processedBooks = userBooks.map(userBook => {
          const bookDetails = allBooks.find(book => book.id === userBook.bookid);
          
          if (bookDetails) {
            return {
              id: bookDetails.id,
              title: bookDetails.title,
              author: bookDetails.author,
              coverUrl: bookDetails.image || './examplecover.jpg',
              link: `book/${bookDetails.id}`,
              rating: bookDetails.rating || 0,
              genre: bookDetails.genre || '',
              description: bookDetails.description || '',
              publishedYear: bookDetails.publishedYear || 0,
              state: 'reading'
            };
          }
          return null;
        }).filter(book => book !== null) as typeof this.books;
        
        this.books = processedBooks;
        //console.log('Reading books loaded:', this.books.length);
      }
    } catch (error) {
      console.error('Failed to load reading books:', error);
      this.books = [];
    }
  }
  
  openPopup(bookId: number) {
    //console.log('Opening popup for book:', bookId);
    const popup = document.getElementById(`popup-${bookId}`);
    if (popup) {
      popup.classList.add('active');
    } else {
      console.error(`Popup for book ${bookId} not found`);
    }
  }
  
  closePopup(bookId: number) {
    const popup = document.getElementById(`popup-${bookId}`);
    if (popup) {
      popup.classList.remove('active');
      const dataChanged = popup.getAttribute('data-changed') === 'true';
      if (dataChanged) {
        setTimeout(() => {
          window.location.reload();
        }, 300);
      }
    }
  }
}