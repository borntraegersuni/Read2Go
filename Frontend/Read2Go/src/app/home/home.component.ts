import { Component } from '@angular/core';
import { TitlePicComponent } from "../title-pic/title-pic.component";
import { BookRatingComponent } from "../book-rating/book-rating.component";
import { BCWidgetComponent } from "../bcwidget/bcwidget.component";
import { RouterOutlet } from '@angular/router';
import { BookSlider2Component } from "../book-slider-2/book-slider-2.component";

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, TitlePicComponent, BookRatingComponent, BCWidgetComponent, BookSlider2Component, BookSlider2Component],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
