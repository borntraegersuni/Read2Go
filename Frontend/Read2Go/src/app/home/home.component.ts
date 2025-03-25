import { Component } from '@angular/core';
import { TitlePicComponent } from "../title-pic/title-pic.component";
import { BCWidgetComponent } from "../bcwidget/bcwidget.component";
import { MostpopularComponent } from '../mostpopular/mostpopular.component';
import { NewcomersComponent } from "../newcomers/newcomers.component";

@Component({
  selector: 'app-home',
  imports: [TitlePicComponent,BCWidgetComponent, MostpopularComponent, NewcomersComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}
