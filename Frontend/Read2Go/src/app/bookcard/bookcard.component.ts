import { Component, AfterViewInit, Input } from '@angular/core';
import { BookoverviewComponent } from "../bookoverview/bookoverview.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookcard',
  standalone: true,
  templateUrl: './bookcard.component.html',
  styleUrls: ['./bookcard.component.css'],
  imports: [BookoverviewComponent, CommonModule]
})
export class BookcardComponent implements AfterViewInit {
  @Input() title!: string;
  @Input() coverUrl!: string;
  @Input() link!: string;
  @Input() author!: string;
  @Input() rating!: number;
  @Input() bookId!: number;

  stars: number[] = [1, 2, 3, 4, 5];


  
  ngAfterViewInit() {
    this.initializePopup();
  }

  setRating(rating: number) {
    this.rating = rating;
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
}
