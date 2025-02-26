import { Component, AfterViewInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-rating.component.html',
  styleUrls: ['./book-rating.component.css']
})
export class BookRatingComponent implements AfterViewInit {
  index: number = 0;

  covers: string[] = [
    '/examplecover.jpg', './examplecover.jpg', '/examplecover.jpg',
    '/examplecover.jpg', '/examplecover.jpg', '/examplecover.jpg',
    '/examplecover.jpg', '/examplecover.jpg', '/examplecover.jpg',
    '/wduihwdiuhw.jpg'
  ]; // An array of image URLs for the book covers

  ngAfterViewInit() {
    this.updateSlider();
  }

  updateSlider() {
    const slider = document.querySelector('.slider') as HTMLElement;
    const totalSlides = this.covers.length;
    const maxIndex = totalSlides - 5;
    slider.style.transform = `translateX(-${this.index * 100 / totalSlides}%)`;

    const prevButton = document.querySelector('.prev') as HTMLElement;
    const nextButton = document.querySelector('.next') as HTMLElement;

    if (this.index === 0) {
      prevButton.style.display = 'none';
    } else {
      prevButton.style.display = 'block';
    }

    if (this.index === maxIndex) {
      nextButton.style.display = 'none';
    } else {
      nextButton.style.display = 'block';
    }
  }

  nextSlide() {
    const totalSlides = this.covers.length;
    if (this.index < totalSlides - 1) {
      this.index++;
      this.updateSlider();
    }
  }

  prevSlide() {
    if (this.index > 0) {
      this.index--;
      this.updateSlider();
    }
  }
}
