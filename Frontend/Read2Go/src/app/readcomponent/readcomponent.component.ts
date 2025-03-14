import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookoverviewComponent } from '../bookoverview/bookoverview.component';
import { AuthService } from '../services/auth.service';

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
      // Get books marked as finished from the service
      const userBooks = await this.authService.getBooks('finished');
      
      // Get book details for each book
      const allBooks = await this.authService.getAllBooks();
      
      if (userBooks && userBooks.length > 0) {
        const processedBooks = userBooks.map(userBook => {
          // Find the matching book in allBooks
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
  
  // Open the popup for a specific book
  openPopup(bookId: number) {
    console.log('Opening popup for book:', bookId);
    const popup = document.getElementById(`popup-${bookId}`);
    if (popup) {
      popup.classList.add('active');
    } else {
      console.error(`Popup for book ${bookId} not found`);
    }
  }
  
  // Close the popup
  closePopup(bookId: number) {
    const popup = document.getElementById(`popup-${bookId}`);
    if (popup) {
      popup.classList.remove('active');
      // Check if data has changed to determine whether to reload
      const dataChanged = popup.getAttribute('data-changed') === 'true';
      if (dataChanged) {
        setTimeout(() => {
          window.location.reload();
        }, 300);
      }
    }
  }
}
