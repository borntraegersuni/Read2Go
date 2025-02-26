import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-slider-2',
  imports: [CommonModule],
  templateUrl: './book-slider-2.component.html',
  styleUrl: './book-slider-2.component.css'
})
export class BookSlider2Component {
  currentIndex: number = 0;

  images: string[] = [
    '/examplecover.jpg', './examplecover.jpg', '/examplecover.jpg',
    '/examplecover.jpg', '/examplecover.jpg', '/examplecover.jpg',
    '/examplecover.jpg', '/examplecover.jpg', '/examplecover.jpg',
    '/examplecover.jpg'
  ]; // An array of image URLs

  ngAfterViewInit() {
    this.updateCarousel();
  }

  updateCarousel() {
    const slider = document.querySelector('.slider2') as HTMLElement;
    const totalImages = this.images.length;
    const maxIndex = totalImages - 5;
    slider.style.transform = `translateX(-${this.currentIndex * 100 / totalImages}%)`;

    const prevButton = document.querySelector('.prev2') as HTMLElement;
    const nextButton = document.querySelector('.next2') as HTMLElement;

    if (this.currentIndex === 0) {
      prevButton.style.display = 'none';
    } else {
      prevButton.style.display = 'block';
    }

    if (this.currentIndex === maxIndex) {
      nextButton.style.display = 'none';
    } else {
      nextButton.style.display = 'block';
    }
  }

  goToNextSlide() {
    const totalImages = this.images.length;
    if (this.currentIndex < totalImages - 1) {
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
