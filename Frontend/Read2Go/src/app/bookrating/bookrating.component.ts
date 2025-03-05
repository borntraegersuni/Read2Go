import { Component, AfterViewInit, Renderer2 } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-bookrating',
  templateUrl: './bookrating.component.html',
  styleUrls: ['./bookrating.component.css'],
})
export class BookratingComponent implements AfterViewInit {
  constructor(
    private renderer: Renderer2,
    private readonly auth: AuthService
  ) {}

  ngAfterViewInit() {
    this.initializeStars();
  }

  private initializeStars() {
    const stars = document.querySelectorAll('.stars span');
    stars.forEach((star) => {
      this.renderer.listen(star, 'click', (event) =>
        this.onStarClick(event, stars)
      );
    });
  }

  private onStarClick(event: MouseEvent, stars: NodeListOf<Element>) {
    event.stopImmediatePropagation();
    stars.forEach((star) => this.renderer.removeClass(star, 'active'));

    const clickedStar = event.target as HTMLElement;
    const rating = clickedStar.getAttribute('data-value');
    this.auth
      .sendReview(Number(clickedStar.getAttribute('bookId')), Number(rating))
      .then(() => {
        alert('You rated this book ' + rating + ' stars');
      });
  }
}
