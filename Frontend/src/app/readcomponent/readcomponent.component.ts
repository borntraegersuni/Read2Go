import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookoverviewComponent } from '../bookoverview/bookoverview.component';
import { AuthService } from '../services/auth.service';

/**
 * ReadcomponentComponent displays a list of books marked as 'finished' by the user.
 * This component fetches user's finished books along with their details, displays them,
 * and provides functionality to open and close book detail popups.
 */
@Component({
  selector: 'app-readcomponent',
  standalone: true,
  imports: [CommonModule, BookoverviewComponent],
  templateUrl: './readcomponent.component.html',
  styleUrl: './readcomponent.component.css'
})
export class ReadcomponentComponent implements OnInit {
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
      const userBooks = await this.authService.getBooks('finished');
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
              state: 'finished'
            };
          }
          return null;
        }).filter(book => book !== null) as typeof this.books;
        
        this.books = processedBooks;
        console.log('Read books loaded:', this.books.length);
      }
    } catch (error) {
      console.error('Failed to load read books:', error);
      this.books = [];
    }
  }
  
  openPopup(bookId: number) {
    console.log('Opening popup for book:', bookId);
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
