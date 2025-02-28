import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-botmfeb',
  imports: [CommonModule],
  templateUrl: './botmfeb.component.html',
  styleUrl: './botmfeb.component.css'
})
export class BotmfebComponent {
  bookTitle: string = "Feb 25' Pick";
  bookImage: string = "ironflame.jpeg"; // Pfad zum Buchbild
  averageRating: number = 3; // Durchschnittliche Sternebewertung
  description: string = `Everyone expected Violet Sorrengail to die during her first year at Basgiath War College—Violet included. But Threshing was only the first impossible test meant to weed out the weak-willed, the unworthy, and the unlucky.
  Now the real training begins, and Violet’s already wondering how she’ll get through. It’s not just that it’s grueling and maliciously brutal, or even that it’s designed to stretch the riders’ capacity for pain beyond endurance. It’s the new vice commandant, who’s made it his personal mission to teach Violet exactly how powerless she is–unless she betrays the man she loves.
  Although Violet’s body might be weaker and frailer than everyone else’s, she still has her wits—and a will of iron. And leadership is forgetting the most important lesson Basgiath has taught her: Dragon riders make their own rules.
  But a determination to survive won’t be enough this year.
  Because Violet knows the real secret hidden for centuries at Basgiath War College—and nothing, not even dragon fire, may be enough to save them in the end.`;
}
