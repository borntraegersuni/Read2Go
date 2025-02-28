import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-botmfeb',
  imports: [CommonModule],
  templateUrl: './botmfeb.component.html',
  styleUrl: './botmfeb.component.css'
})
export class BotmfebComponent {
  PickOf: string = "Feb 25' Pick";
  bookTitle: string = "Iron Flame by Rebecca Yarros";
  bookImage: string = "ironflame.jpeg"; // Pfad zum Buchbild
  averageRating: number = 3; // Durchschnittliche Sternebewertung
  description: string = `Violet Sorrengail, who expected to die during her first year at Basgiath War College, faces brutal challenges and the threat of the new vice commandant, who aims to teach her just how powerless she is unless she betrays the man she loves, while simultaneously learning the crucial lesson that dragon riders make their own rules, and she realizes that her determination alone may not be enough to survive the hidden dangers the school holds.`;
  isModalOpen: boolean = false; 
  openModal() {
    this.isModalOpen = true; // Modal öffnen
  }
  closeModal() {
    this.isModalOpen = false; // Modal schließen
  }
}
