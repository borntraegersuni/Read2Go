import { Component, AfterViewInit, Input, OnInit } from '@angular/core';
import { BookoverviewComponent } from "../bookoverview/bookoverview.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-bookcard',
  standalone: true,
  templateUrl: './bookcard.component.html',
  styleUrls: ['./bookcard.component.css'],
  imports: [BookoverviewComponent, CommonModule]
})
export class BookcardComponent implements OnInit, AfterViewInit {
  @Input() title!: string;
  @Input() coverUrl!: string;
  @Input() link!: string;
  @Input() author!: string;
  @Input() rating!: number;
  @Input() bookId!: number;

  stars: number[] = [1, 2, 3, 4, 5];

  constructor(private authService: AuthService) {}
  
  async ngOnInit() {
    if (this.bookId) {
      try {
        // Fetch all books and find the one with matching ID
        const books = await this.authService.getBooks("");
        const book = books.find(b => b.id === this.bookId);
        
        if (book) {
          // Update cover URL if it exists in the backend
          this.coverUrl = book.image && book.image !== "" 
            ? book.image 
            : this.coverUrl || "./examplecover.jpg";
            
          // Optionally update other properties if needed
          this.title = book.title || this.title;
          this.author = book.author || this.author;
          this.rating = book.rating || this.rating;
        }
        
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    }
  }

  ngAfterViewInit() {
    // Use setTimeout to ensure DOM elements are fully rendered
    setTimeout(() => {
      this.initializePopup();
    }, 0);
  }

  async setRating(rating: number) {
    this.rating = rating;
    try {
      // Get the actual bookId (not the userBookId)
      const books = await this.authService.getBooks("");
      const book = books.find(b => b.id === this.bookId);
      
      if (book && book.bookid) {
        // Use the actual bookid from the book object
        await this.authService.sendReview(book.bookid, rating);
        console.log('Rating saved successfully');
      } else {
        console.error('Book not found or bookid missing');
      }
    } catch (error) {
      console.error('Error saving rating:', error);
    }
  }

  initializePopup() {
    const viewMore = document.querySelector('.view-more');
    const popup = document.getElementById('popup');
    const closePopup = document.querySelector('.close-popup');
    
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
    
    newViewMore.addEventListener('click', () => {
      console.log('View more clicked!');
      popup.classList.toggle('active');
    });

    closePopup.addEventListener('click', () => {
      console.log('Close popup clicked!');
      popup.classList.remove('active');
    });
  }
}