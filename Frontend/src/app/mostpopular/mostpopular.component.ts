import { Component, AfterViewInit, Input, OnInit, OnDestroy } from '@angular/core';
import { BookoverviewComponent } from '../bookoverview/bookoverview.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

/**
 * MostpopularComponent displays a carousel of the most popular books based on ratings.
 * It fetches book data from the server, sorts them by rating, and displays the top 10 books
 * in a responsive slider. The component handles different screen sizes by adjusting the number
 * of visible books. Users can click on book covers to view detailed information in a popup.
 * The component can also display a specific book's details when provided with a bookId input.
 */
@Component({
  selector: 'app-mostpopular',
  imports: [CommonModule, BookoverviewComponent],
  templateUrl: './mostpopular.component.html',
  styleUrl: './mostpopular.component.css'
})
export class MostpopularComponent implements OnInit, AfterViewInit, OnDestroy {
  currentIndex: number = 0;
  images: string[] = [];
  books: Array<{
    id: number;
    title: string;
    author: string;
    image: string;
    rating: number;
    genre: string;
    description: string;
    publishedYear: number;
    state?: string;
  }> = [];

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
      
      const sortedBooks = [...books].sort((a, b) => {
        return b.rating - a.rating;
      });
      const lastTenBooks = sortedBooks.slice(0, 10);
      console.log('Using newest books:', lastTenBooks.length);
      
      this.books = lastTenBooks.map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        image: book.image,
        rating: book.rating,
        genre: book.genre,
        description: book.description || '',
        publishedYear: book.publishedYear,
      }));
      
      this.images = lastTenBooks.map(book => {
        const imageUrl = book.image && book.image !== '' ? book.image : './examplecover.jpg';
        console.log(`Book "${book.title}" image: ${imageUrl}`);
        return imageUrl;
      });
      
      if (this.images.length === 0) {
        console.log('No books found, using fallback image');
        this.images = ['./examplecover.jpg'];
      }
      
      setTimeout(() => this.updateCarousel(), 0);
    } catch (error) {
      console.error('Error loading book images:', error);
      this.images = ['./examplecover.jpg'];
      setTimeout(() => this.updateCarousel(), 0);
    }
  }
  
  async ngOnInit() {
    await this.loadImages();
    
    if (this.bookId) {
      try {
        const books = await this.authService.getAllBooks();
        const book = books.find((b) => b.id === this.bookId);
        
        if (!book) {
          console.log('Book not found:', this.bookId);
          return;
        }
        
        const userBooks = await this.authService.getBooks('');
        const userBook = userBooks.find((b) => b.bookid === book?.id);
        
        console.log('Book found:', book.title, 'Rating:', book.rating);
        
        this.coverUrl = book.image && book.image !== '' 
          ? book.image 
          : this.coverUrl || './examplecover.jpg';
        
        this.title = book.title || this.title;
        this.author = book.author || this.author;
        this.rating = book.rating || this.rating;
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    }
  }

  ngAfterViewInit() {
    setTimeout(() => this.updateCarousel(), 100);
    setTimeout(() => this.initializePopups(), 200);
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  updateCarousel() {
    const slider = document.querySelector('.slider2') as HTMLElement;
    if (!slider) {
      console.error('Slider element not found');
      return;
    }
    
    const totalImages = this.books.length;
    if (totalImages === 0) {
      console.warn('No images to display in carousel');
      return;
    }
    
    const visibleSlides = this.getVisibleSlidesCount();
    const maxIndex = Math.max(0, totalImages - visibleSlides);
    
    if (this.currentIndex > maxIndex) {
      this.currentIndex = maxIndex;
    }
    
    const slideWidth = 100 / visibleSlides;
    slider.style.transform = `translateX(-${this.currentIndex * slideWidth}%)`;
    
    const prevButton = document.querySelector('.prev2') as HTMLElement;
    const nextButton = document.querySelector('.next2') as HTMLElement;
    
    if (prevButton) {
      prevButton.style.display = this.currentIndex === 0 ? 'none' : 'flex';
    }
    
    if (nextButton) {
      nextButton.style.display = this.currentIndex >= maxIndex ? 'none' : 'flex';
    }
  }

  getVisibleSlidesCount(): number {
    const width = window.innerWidth;
    if (width <= 480) return 2;
    if (width <= 768) return 3;
    if (width <= 1024) return 4;
    return 5;
  }

  goToNextSlide() {
    const visibleSlides = this.getVisibleSlidesCount();
    const maxIndex = Math.max(0, this.books.length - visibleSlides);
    
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
  
  initializePopups() {
    const slides = document.querySelectorAll('.slide2-clickable');
    slides.forEach((slide) => {
      slide.addEventListener('click', (e) => {
        const bookId = (e.currentTarget as HTMLElement).getAttribute('data-book-id');
        if (bookId) {
          this.openPopup(parseInt(bookId));
        }
      });
    });
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

  handleResize() {
    this.updateCarousel();
  }
}
