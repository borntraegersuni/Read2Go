import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-botmjan',
  imports: [CommonModule],
  templateUrl: './botmjan.component.html',
  styleUrl: './botmjan.component.css'
})
export class BotmjanComponent {
  PickOf: string = "Feb 25' Pick";
  bookTitle: string = "Fourth Wing by Rebecca Yarros";
  bookImage: string = "fourthwing.jpeg"; // Pfad zum Buchbild
  averageRating: number = 4; // Durchschnittliche Sternebewertung
  description: string = `Violet Sorrengail, initially destined for a quiet life in the Scribe Quadrant, is thrust into the perilous world of dragon riders by her formidable mother, where her survival is threatened by her physical fragility, rival cadets, and the ruthless wingleader Xaden Riorson, all while a deadly war looms and a sinister secret within the leadership threatens to unravel everything at Basgiath War College, where the only exits are graduation or death.`;
  isModalOpen: boolean = false; 
  openModal() {
    this.isModalOpen = true; // Modal öffnen
  }
  closeModal() {
    this.isModalOpen = false; // Modal schließen
  }
}
