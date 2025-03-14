import { Component, AfterViewInit, Input, OnInit, OnDestroy } from '@angular/core';
import { BookoverviewComponent } from '../bookoverview/bookoverview.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-book-slider-2',
  imports: [CommonModule, BookoverviewComponent],
  templateUrl: './book-slider-2.component.html',
  styleUrl: './book-slider-2.component.css'
})
export class BookSlider2Component implements OnInit, AfterViewInit, OnDestroy {
  currentIndexNew: number = 0;
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
      console.log('Fetched books for newcomer slider:', books.length);
      
      // Sort books by published year in descending order (newest first)
      const sortedBooks = [...books].sort((a, b) => b.publishedYear - a.publishedYear);
      // Get the 10 newest books or fewer if less than 10 books are available
      const lastTenBooks = sortedBooks.slice(0, 10);
      console.log('Using newest books:', lastTenBooks.length);
      
      // Store the full book info for the popup, mapping to required structure
      this.books = lastTenBooks.map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        image: book.image,
        rating: book.rating,
        genre: book.genre,
        description: book.description || '', // Convert null to empty string
        publishedYear: book.publishedYear,
        // state is optional so omitted if not present
      }));
      
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
      setTimeout(() => this.updateCarouselNew(), 0);
    } catch (error) {
      console.error('Error loading book images:', error);
      // Fallback to example cover if error occurs
      this.images = ['./examplecover.jpg'];
      setTimeout(() => this.updateCarouselNew(), 0);
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
    setTimeout(() => this.updateCarouselNew(), 100);
    
    // Initialize popups for the books
    setTimeout(() => this.initializePopupsNew(), 200);
    
    // Add resize listener to update carousel when screen size changes
    window.addEventListener('resize', this.handleResizeNew.bind(this));
  }

  ngOnDestroy() {
    // Clean up the resize listener when component is destroyed
    window.removeEventListener('resize', this.handleResizeNew.bind(this));
  }

  handleResizeNew() {
    this.updateCarouselNew();
  }

  updateCarouselNew() {
    const slider = document.querySelector('.slider-new') as HTMLElement;
    if (!slider) {
      console.error('Newcomer slider element not found');
      return;
    }
    
    const totalBooks = this.books.length;
    if (totalBooks === 0) {
      console.warn('No books to display in newcomer carousel');
      return;
    }
    
    // Get visible slides based on screen size
    const visibleSlides = this.getVisibleSlidesCountNew();
    const maxIndex = Math.max(0, totalBooks - visibleSlides);
    
    // Make sure currentIndexNew doesn't exceed maxIndex
    if (this.currentIndexNew > maxIndex) {
      this.currentIndexNew = maxIndex;
    }
    
    // Calculate slide width as percentage based on visible slides
    const slideWidth = 100 / visibleSlides;
    slider.style.transform = `translateX(-${this.currentIndexNew * slideWidth}%)`;
    
    // Update navigation buttons visibility
    const prevButton = document.querySelector('.prev-new') as HTMLElement;
    const nextButton = document.querySelector('.next-new') as HTMLElement;
    
    if (prevButton) {
      prevButton.style.display = this.currentIndexNew === 0 ? 'none' : 'flex';
    }
    
    if (nextButton) {
      nextButton.style.display = this.currentIndexNew >= maxIndex ? 'none' : 'flex';
    }
  }

  getVisibleSlidesCountNew(): number {
    // Return number of visible slides based on screen width
    const width = window.innerWidth;
    if (width <= 480) return 2;      // Mobile: 2 slides
    if (width <= 768) return 3;      // Tablet: 3 slides
    if (width <= 1024) return 4;     // Small desktop: 4 slides
    return 5;                        // Large desktop: 5 slides
  }

  goToNextSlideNew() {
    const visibleSlides = this.getVisibleSlidesCountNew();
    const maxIndex = Math.max(0, this.books.length - visibleSlides);
    
    if (this.currentIndexNew < maxIndex) {
      this.currentIndexNew++;
      this.updateCarouselNew();
    }
  }

  goToPreviousSlideNew() {
    if (this.currentIndexNew > 0) {
      this.currentIndexNew--;
      this.updateCarouselNew();
    }
  }
  
  // Initialize the popups for book covers
  initializePopupsNew() {
    const slides = document.querySelectorAll('.slide-new-clickable');
    slides.forEach((slide) => {
      slide.addEventListener('click', (e) => {
        const bookId = (e.currentTarget as HTMLElement).getAttribute('data-book-id');
        if (bookId) {
          this.openPopupNew(parseInt(bookId));
        }
      });
    });
  }
  
  // Open the popup for a specific book
  openPopupNew(bookId: number) {
    console.log('Opening popup for newcomer book:', bookId);
    const popup = document.getElementById(`popup-new-${bookId}`);
    if (popup) {
      popup.classList.add('active');
    } else {
      console.error(`Popup for newcomer book ${bookId} not found`);
    }
  }
  
  // Close the popup
  closePopupNew(bookId: number) {
    const popup = document.getElementById(`popup-new-${bookId}`);
    if (popup) {
      popup.classList.remove('active');
      // Reload page after popup is closed to refresh data
      // Pass a parameter to indicate if data has changed
      const dataChanged = popup.getAttribute('data-changed') === 'true';
      if (dataChanged) {
        setTimeout(() => {
          window.location.reload();
        }, 300);
      }
    }
  }
}