import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitlePicComponent } from "./title-pic/title-pic.component";
import { BookRatingComponent } from "./book-rating/book-rating.component";
import { BCWidgetComponent } from "./bcwidget/bcwidget.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TitlePicComponent, BookRatingComponent, BCWidgetComponent, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Read2Go';
}
