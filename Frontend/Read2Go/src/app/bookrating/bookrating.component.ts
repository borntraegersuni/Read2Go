import { Component, AfterViewInit, Renderer2, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookrating',
  templateUrl: './bookrating.component.html',
  styleUrls: ['./bookrating.component.css'],
  imports: [CommonModule],
})
export class BookratingComponent {
  constructor(
    private renderer: Renderer2,
    private readonly auth: AuthService
  ) {}
  @Input() rating!: number;
  @Input() bookId!: number;
  stars = [1, 2, 3, 4, 5];
  async setRating(rating: number) {
    this.rating = rating;
    try {
      const books = await this.auth.getBooks('');
      const book = books.find((b) => b.id === this.bookId);

      if (book && book.bookid) {
        await this.auth.sendReview(book.bookid, rating);
        console.log('Rating saved successfully');
        alert('Your rated that book with ' + rating + ' stars');
      } else {
        console.error('Book not found or bookid missing');
      }
    } catch (error) {
      console.error('Error saving rating:', error);
    }
  }
  review = '';
  async sendBookReview(event: any, bookId: number, review: string) {
    event.preventDefault();
    if (!this.rating) {
      console.error('No rating selected');
      return;
    }
    try {
      await this.auth.sendBookReview(bookId, this.rating, review);
      console.log('Review saved successfully');
      alert('Your review has been saved');
    } catch (error) {
      console.error('Error saving review:', error);
    }
  }

  async ngOnInit() {
    console.log();
    const books = await this.auth.getBooks('');
    const book = books.find((b) => b.id === this.bookId);
    if (book && book.bookid)
      this.review = await this.auth.getReviewForBookByUserBookId(book?.bookid);
    console.log('BookId:', this.bookId,'Review:', this.review);
  }
}
