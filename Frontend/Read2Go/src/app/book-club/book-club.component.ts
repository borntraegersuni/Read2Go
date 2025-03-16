import { Component } from '@angular/core';
import { BCWidgetComponent } from '../bcwidget/bcwidget.component';
import { BotmdecComponent } from '../botmdec/botmdec.component';
import { BotmjanComponent } from '../botmjan/botmjan.component';
import { BotmfebComponent } from '../botmfeb/botmfeb.component';

@Component({
  selector: 'app-book-club',
  imports: [BCWidgetComponent, BotmdecComponent, BotmjanComponent, BotmfebComponent],
  templateUrl: './book-club.component.html',
  styleUrl: './book-club.component.css'
})
export class BookClubComponent {

}
