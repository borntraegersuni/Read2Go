import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-bookrating',
  templateUrl: './bookrating.component.html',
  styleUrls: ['./bookrating.component.css']
})
export class BookratingComponent implements AfterViewInit {

  ngAfterViewInit() {
    this.initializeStars();
  }

  initializeStars() {
    document.querySelectorAll('.stars span').forEach(star => {
      star.addEventListener('click', function(this: HTMLElement) {
        document.querySelectorAll('.stars span').forEach(s => (s as HTMLElement).classList.remove('active'));
        this.classList.add('active');
        let prev = this.previousElementSibling as HTMLElement;
        while (prev) {
          prev.classList.add('active');
          prev = prev.previousElementSibling as HTMLElement;
        }
        const rating = this.getAttribute('data-value');
        alert(`You rated this book ${rating} stars!`);
      });
    });
  }
}
