import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-botmdec',
  imports: [CommonModule],
  templateUrl: './botmdec.component.html',
  styleUrl: './botmdec.component.css'
})
export class BotmdecComponent {
  bookTitle: string = "Dec 24' Pick";
  bookImage: string = "tog1.jpeg"; // Pfad zum Buchbild
  averageRating: number = 5; // Durchschnittliche Sternebewertung
  description: string = `In a land without magic, an assassin is summoned to the castle. She has no love for the vicious king who rules from his throne of glass, but she has not come to kill him. She has come to win her freedom. If she defeats twenty-three murderers, thieves, and warriors in a competition, she will be released from prison to serve as the King's Champion.

Her name is Celaena Sardothien.

The Crown Prince will provoke her. The Captain of the Guard will protect her. And a princess from a faraway country will befriend her. But something rotten dwells in the castle, and it's there to kill. When her competitors start dying mysteriously, one by one, Celaena's fight for freedom becomes a fight for survival-and a desperate quest to root out the evil before it destroys her world.`;
}
