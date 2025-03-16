import { Component, AfterViewInit, Input, OnInit } from '@angular/core';
import { BookoverviewComponent } from '../bookoverview/bookoverview.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-bookcard',
  standalone: true,
  templateUrl: './bookcard.component.html',
  styleUrls: ['./bookcard.component.css'],
  imports: [BookoverviewComponent, CommonModule],
})
export class BookcardComponent implements OnInit, AfterViewInit {
  @Input() title!: string;
  @Input() coverUrl!: string;
  @Input() link!: string;
  @Input() author!: string;
  @Input() rating!: number; // This will now always be the average rating
  @Input() userRating: number = 0; // New property for user's personal rating
  @Input() bookId!: number;
  @Input() genre!: string;
  @Input() description!: string;
  @Input() published!: number;
  @Input() state!: string;
  @Input() display: boolean = true;
  @Input() isSearchPage: boolean = false;
  stars: number[] = [1, 2, 3, 4, 5];
  isPopupOpen = false;

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    if (this.bookId) {
      try {
        // Fetch all books to get the general average rating
        const books = await this.authService.getAllBooks();
        const book = books.find((b) => b.id === this.bookId);
        
        if (!book) {
          console.log('Book not found');
          return;
        }
        
        // Get user books to find the user's personal rating
        const userBooks = await this.authService.getBooks('');
        const userBook = userBooks.find((b) => b.bookid === book.id);
        
        console.log('Book ID:', this.bookId, 'Title:', this.title);
        console.log('Average rating:', book.rating);
        
        // Always update the display with the average rating from all users
        if (book) {
          // Update cover URL if it exists in the backend
          this.coverUrl = book.image && book.image !== '' 
            ? book.image 
            : this.coverUrl || './examplecover.jpg';

          // Update the book properties
          this.title = book.title || this.title;
          this.author = book.author || this.author;
          
          // Important: Always use the average rating from the book object
          this.rating = book.rating || 0;
          
          // Store user's personal rating separately
          this.userRating = userBook?.rating || 0;
          
          console.log('Display rating set to average:', this.rating);
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    }
  }

  ngAfterViewInit() {

  }

  async setRating(rating: number) {
    // Only allow rating if not on search page
    if (this.isSearchPage) {
      return; // Do nothing if on search page
    }

    // Store user's personal rating
    this.userRating = rating;
    
    try {
      // Get the actual bookId (not the userBookId)
      const books = await this.authService.getBooks('');
      const book = books.find((b) => b.id === this.bookId);

      if (book && book.bookid) {
        // Send the user's rating to the server
        await this.authService.sendReview(book.bookid, rating);
        console.log('Rating saved successfully');
        
        // After saving, fetch the updated average rating
        const updatedBooks = await this.authService.getAllBooks();
        const updatedBook = updatedBooks.find((b) => b.id === this.bookId);
        if (updatedBook) {
          // Update the display with the new average rating
          this.rating = updatedBook.rating;
          console.log('Updated average rating:', this.rating);
        }
      } else {
        console.error('Book not found or bookid missing');
      }
    } catch (error) {
      console.error('Error saving rating:', error);
    }
  }

  initializePopup() {
    const viewMore = document.querySelector('.view-more');
    const popup = document.getElementById('popup-' + this.bookId);
    const closePopup = document.querySelector('close-popup-' + this.bookId);

    if (!viewMore) {
      console.error('View more button not found in the DOM');
      return;
    }

    if (!popup) {
      console.error('Popup element not found in the DOM');
      return;
    }

    if (!closePopup) {
      console.error('Close popup button not found in the DOM');
      return;
    }

    // Remove any existing event listeners before adding new ones
    const newViewMore = viewMore.cloneNode(true);
    viewMore.parentNode?.replaceChild(newViewMore, viewMore);

    closePopup.addEventListener('click', () => {
      console.log('Close popup clicked!');
      popup.classList.remove('active');
    });
  }

  closePopup() {
    console.log('Close popup clicked!');
    const popup = document.getElementById('popup-' + this.bookId);
    if (!popup) {
      console.error('Popup element not found in the DOM');
      return;
    }
    popup.classList.remove('active');
    // Reload the page after the popup is closed to refresh data
    setTimeout(() => {
      window.location.reload();
    }, 300); // Small delay to allow the animation to complete
  }

  openPopup() {
    console.log('View more clicked!');
    const popup = document.getElementById('popup-' + this.bookId);
    if (!popup) {
      console.error('Popup element not found in the DOM');
      return;
    }
    console.log('book title', this.title);
    console.log('View more clicked!');
    popup.classList.toggle('active');
  }
}
