import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-book-rating',
  templateUrl: './book-rating.component.html',
  styleUrls: ['./book-rating.component.css']
})
export class BookRatingComponent {
  @Input() TitleWidget: string = ''; // To accept the dynamic title
  index: number = 0;

  covers: string[] = [
    '/examplecover.jpg', './examplecover.jpg', '/examplecover.jpg',
    '/examplecover.jpg', '/examplecover.jpg', '/examplecover.jpg',
    '/examplecover.jpg', '/examplecover.jpg', '/examplecover.jpg',
    '/examplecover.jpg'
  ]; // An array of image URLs for the book covers

  moveSlide(step: number): void {
    const slidesVisible = 5; // Number of slides you want visible at once
    const totalSlides = this.covers.length; // Get the dynamic length of covers
    const maxIndex = totalSlides - slidesVisible; // Ensure the last index stays within bounds

    // Update the index and ensure it stays within bounds
    this.index = Math.max(0, Math.min(this.index + step, maxIndex));

    // Move the slider container by a percentage based on the index
    const slider = document.querySelector('.slider') as HTMLElement;
    if (slider) {
      const slideWidth = 100 / slidesVisible; // Each slide takes up a fixed percentage of the visible area
      slider.style.transform = `translateX(-${this.index * slideWidth}%)`;
    }
  }
}
