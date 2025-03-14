import { Component, AfterViewInit, Input, OnInit } from '@angular/core';
import { BookoverviewComponent } from '../bookoverview/bookoverview.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-book-slider-2',
  imports: [CommonModule, BookoverviewComponent],
  templateUrl: './book-slider-2.component.html',
  styleUrl: './book-slider-2.component.css'
})
export class BookSlider2Component implements OnInit, AfterViewInit {
  currentIndex: number = 0;
  images: string[] = [];

  @Input() title!: string;
  @Input() coverUrl!: string;
  @Input() link!: string;
  @Input() author!: string;
  @Input() rating!: number;
  @Input() bookId!: number;
  @Input() genre!: string;
  @Input() description!: string;
  @Input() published!: number;
  @Input() state!: string;
  @Input() display: boolean = true;
  stars: number[] = [1, 2, 3, 4, 5];
  
  constructor(private authService: AuthService) {}
  
  async loadImages() {
    try {
      const books = await this.authService.getAllBooks();
      console.log('Fetched books for slider:', books.length);
      
      // Get the last 10 books or fewer if less than 10 books are available
      const lastTenBooks = books.slice(Math.max(0, books.length - 10));
      console.log('Using last books:', lastTenBooks.length);
      
      // Map the books to their image URLs, fallback to example cover
      this.images = lastTenBooks.map(book => {
        const imageUrl = book.image && book.image !== '' ? book.image : './examplecover.jpg';
        console.log(`Book "${book.title}" image: ${imageUrl}`);
        return imageUrl;
      });
      
      // Ensure we have at least one image
      if (this.images.length === 0) {
        console.log('No books found, using fallback image');
        this.images = ['./examplecover.jpg'];
      }
      
      // Update carousel after images are loaded
      setTimeout(() => this.updateCarousel(), 0);
    } catch (error) {
      console.error('Error loading book images:', error);
      // Fallback to example cover if error occurs
      this.images = ['./examplecover.jpg'];
      setTimeout(() => this.updateCarousel(), 0);
    }
  }
  
  async ngOnInit() {
    // Load the newest book covers for the slider
    await this.loadImages();
    
    // If this component is displaying a specific book, fetch its details
    if (this.bookId) {
      try {
        // Fetch all books and find the one with matching ID
        const books = await this.authService.getAllBooks();
        const book = books.find((b) => b.id === this.bookId);
        
        if (!book) {
          console.log('Book not found:', this.bookId);
          return;
        }
        
        const userBooks = await this.authService.getBooks('');
        const userBook = userBooks.find((b) => b.bookid === book?.id);
        
        console.log('Book found:', book.title, 'Rating:', book.rating);
        
        // Update cover URL if it exists in the backend
        this.coverUrl = book.image && book.image !== '' 
          ? book.image 
          : this.coverUrl || './examplecover.jpg';
        
        // Update other properties
        this.title = book.title || this.title;
        this.author = book.author || this.author;
        this.rating = book.rating || this.rating;
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    }
  }

  ngAfterViewInit() {
    // Ensure carousel is updated after view is initialized
    setTimeout(() => this.updateCarousel(), 100);
  }

  updateCarousel() {
    const slider = document.querySelector('.slider2') as HTMLElement;
    if (!slider) {
      console.error('Slider element not found');
      return;
    }
    
    const totalImages = this.images.length;
    if (totalImages === 0) {
      console.warn('No images to display in carousel');
      return;
    }
    
    // Calculate max index based on number of visible slides
    const maxVisibleSlides = 5;
    const maxIndex = Math.max(0, totalImages - maxVisibleSlides);
    
    // Adjust translation percentage based on total images
    slider.style.transform = `translateX(-${this.currentIndex * (100 / totalImages)}%)`;
    
    const prevButton = document.querySelector('.prev2') as HTMLElement;
    const nextButton = document.querySelector('.next2') as HTMLElement;
    
    if (prevButton) {
      prevButton.style.display = this.currentIndex === 0 ? 'none' : 'block';
    }
    
    if (nextButton) {
      nextButton.style.display = this.currentIndex >= maxIndex ? 'none' : 'block';
    }
  }

  goToNextSlide() {
    const totalImages = this.images.length;
    const maxVisibleSlides = 5;
    const maxIndex = Math.max(0, totalImages - maxVisibleSlides);
    
    if (this.currentIndex < maxIndex) {
      this.currentIndex++;
      this.updateCarousel();
    }
  }

  goToPreviousSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateCarousel();
    }
  }
}