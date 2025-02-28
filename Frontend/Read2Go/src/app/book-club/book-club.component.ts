import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BCWidgetComponent } from '../bcwidget/bcwidget.component';
import { BotmdecComponent } from '../botmdec/botmdec.component';
import { BotmjanComponent } from '../botmjan/botmjan.component';
import { BotmfebComponent } from '../botmfeb/botmfeb.component';

@Component({
  selector: 'app-book-club',
  imports: [RouterOutlet, BCWidgetComponent, BotmdecComponent, BotmjanComponent, BotmfebComponent],
  templateUrl: './book-club.component.html',
  styleUrl: './book-club.component.css'
})
export class BookClubComponent {

}
