import { Component, AfterViewInit, Renderer2, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookrating',
  templateUrl: './bookrating.component.html',
  styleUrls: ['./bookrating.component.css'],
  imports: [CommonModule],
})

/**
 * Component for handling book ratings and reviews.
 * 
 * This component allows users to:
 * - Rate books on a 5-star scale
 * - Submit written reviews for books
 * - View their previously submitted ratings and reviews
 * 
 * The component displays toast notifications to provide feedback on user actions
 * and manages the API interactions with the AuthService to persist ratings and reviews.
 */

export class BookratingComponent {
  constructor(
    private renderer: Renderer2,
    private readonly auth: AuthService
  ) {}

  @Input() rating!: number;
  @Input() bookId!: number;
  @Input() avgRating!: number;
  stars = [1, 2, 3, 4, 5];
  review = '';

  toast = {
    show: false,
    message: '',
    type: 'success' as 'success' | 'error' | 'info' | 'warning',
    timeout: null as any,
  };

  async setRating(rating: number) {
    this.rating = rating;
    try {
      const books = await this.auth.getBooks('');
      const book = books.find((b) => b.id === this.bookId);

      if (book && book.bookid) {
        await this.auth.sendReview(book.bookid, rating);
        console.log('Rating saved successfully');
        this.showToast(`You rated that book with ${rating} stars`, 'success');
      } else {
        console.error('Book not found or bookid missing');
        this.showToast('Could not save rating: Book not found', 'error');
      }
    } catch (error) {
      console.error('Error saving rating:', error);
      this.showToast('Failed to save rating', 'error');
    }
  }

  async sendBookReview(event: any, bookId: number, review: string) {
    event.preventDefault();
    if (!this.rating) {
      console.error('No rating selected');
      this.showToast(
        'Please select a rating before submitting your review',
        'warning'
      );
      return;
    }

    try {
      await this.auth.sendBookReview(bookId, this.rating, review);
      console.log('Review saved successfully');
      this.showToast('Your review has been saved', 'success');
    } catch (error) {
      console.error('Error saving review:', error);
      this.showToast('Failed to save review', 'error');
    }
  }

  async ngOnInit() {
    try {
      const books = await this.auth.getBooks('');
      const book = books.find((b) => b.id === this.bookId);
      if (book && book.bookid) {
        this.review = await this.auth.getReviewForBookByUserBookId(
          book?.bookid
        );
      }
      console.log('BookId:', this.bookId, 'Review:', this.review);
    } catch (error) {
      console.error('Error fetching review:', error);
    }
  }

  showToast(message: string, type: 'success' | 'error' | 'warning' | 'info') {
    if (this.toast.timeout) {
      clearTimeout(this.toast.timeout);
    }

    this.toast.show = true;
    this.toast.message = message;
    this.toast.type = type;

    this.toast.timeout = setTimeout(
      () => {
        this.hideToast();
      },
      type === 'error' ? 5000 : 3000
    ); 
  }

  hideToast() {
    this.toast.show = false;
  }
}
