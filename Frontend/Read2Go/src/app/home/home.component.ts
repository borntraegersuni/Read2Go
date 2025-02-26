import { Component } from '@angular/core';
import { TitlePicComponent } from "../title-pic/title-pic.component";
import { BookRatingComponent } from "../book-rating/book-rating.component";
import { BCWidgetComponent } from "../bcwidget/bcwidget.component";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [RouterOutlet, TitlePicComponent, BookRatingComponent, BCWidgetComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
