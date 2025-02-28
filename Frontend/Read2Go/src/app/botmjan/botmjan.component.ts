import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-botmjan',
  imports: [CommonModule],
  templateUrl: './botmjan.component.html',
  styleUrl: './botmjan.component.css'
})
export class BotmjanComponent {
  bookTitle: string = "Jan 25' Pick";
  bookImage: string = "fourthwing.jpeg"; // Pfad zum Buchbild
  averageRating: number = 4; // Durchschnittliche Sternebewertung
  description: string = `Twenty-year-old Violet Sorrengail was supposed to enter the Scribe Quadrant, living a quiet life among books and history. Now, the commanding general―also known as her tough-as-talons mother―has ordered Violet to join the hundreds of candidates striving to become the elite of Navarre: dragon riders.

But when you’re smaller than everyone else and your body is brittle, death is only a heartbeat away…because dragons don’t bond to “fragile” humans. They incinerate them.

With fewer dragons willing to bond than cadets, most would kill Violet to better their own chances of success. The rest would kill her just for being her mother’s daughter―like Xaden Riorson, the most powerful and ruthless wingleader in the Riders Quadrant.

She’ll need every edge her wits can give her just to see the next sunrise.

Yet, with every day that passes, the war outside grows more deadly, the kingdom’s protective wards are failing, and the death toll continues to rise. Even worse, Violet begins to suspect leadership is hiding a terrible secret.

Friends, enemies, lovers. Everyone at Basgiath War College has an agenda―because once you enter, there are only two ways out: graduate or die.`;
}
