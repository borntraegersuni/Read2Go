import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-bookcard',
  templateUrl: './bookcard.component.html',
  styleUrls: ['./bookcard.component.css']
})
export class BookcardComponent implements AfterViewInit {

  ngAfterViewInit() {
    this.initializePopup();
    this.initializeStars();
  }

  initializePopup() {
    const viewMore = document.querySelector('.view-more');
    const popup = document.getElementById('popup');
    const closePopup = document.querySelector('.close-popup');
    
    viewMore?.addEventListener('click', () => {
      popup?.classList.toggle('active');
    });

    closePopup?.addEventListener('click', () => {
      popup?.classList.remove('active');
    });
  }

  initializeStars() {
    document.querySelectorAll('.stars span').forEach(star => {
      star.addEventListener('mouseover', function(this: HTMLElement) {
        Array.from(document.querySelectorAll('.stars span')).reverse().forEach(s => (s as HTMLElement).style.color = 'lightgray');
        this.style.color = 'gold';
        let prev = this.previousElementSibling as HTMLElement;
        while (prev) {
          prev.style.color = 'gold';
          prev = prev.previousElementSibling as HTMLElement;
        }
      });
      star.addEventListener('click', function(this: HTMLElement) {
        const rating = this.getAttribute('data-value');
        alert(`You rated this book ${rating} stars!`);
      });
    });
  }
}
