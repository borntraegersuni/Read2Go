import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookoverviewComponent } from '../bookoverview/bookoverview.component';
import { AuthService } from '../services/auth.service';

/**
 * Component that manages and displays the user's "To Be Read" (TBR) book list.
 * Fetches books marked as wishlist from the user's library, combines them with
 * complete book details, and provides functionality to view detailed information
 * through interactive popups.
 */
@Component({
  selector: 'app-tbrcomponent',
  standalone: true,
  imports: [CommonModule, BookoverviewComponent],
  templateUrl: './tbrcomponent.component.html',
  styleUrl: './tbrcomponent.component.css'
})
export class TbrcomponentComponent implements OnInit {
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
      const userBooks = await this.authService.getBooks('wishlist');
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
              state: 'wishlist'
            };
          }
          return null;
        }).filter(book => book !== null) as typeof this.books;
        
        this.books = processedBooks;
        //console.log('TBR books loaded:', this.books.length);
      }
    } catch (error) {
      console.error('Failed to load TBR books:', error);
      this.books = [];
    }
  }

  openPopup(bookId: number) {
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
