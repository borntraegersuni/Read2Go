import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-botmdec',
  imports: [CommonModule],
  templateUrl: './botmdec.component.html',
  styleUrl: './botmdec.component.css'
})
export class BotmdecComponent {
  PickOf: string = "Feb 25' Pick";
  bookTitle: string = "Throne of Glass by Sarah J. Maas";
  bookImage: string = "tog1.jpeg"; // Pfad zum Buchbild
  averageRating: number = 5; // Durchschnittliche Sternebewertung
  description: string = `In a land devoid of magic, assassin Celaena Sardothien is summoned to the castle to compete against twenty-three murderers, thieves, and warriors for her freedom, but as the Crown Prince provokes her, the Captain of the Guard protects her, and a foreign princess befriends her, she discovers a deadly evil within the castle that turns her quest for freedom into a fight for survival.`;
  isModalOpen: boolean = false; 
  openModal() {
    this.isModalOpen = true; // Modal öffnen
  }
  closeModal() {
    this.isModalOpen = false; // Modal schließen
  }
}

