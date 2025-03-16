import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-botmdec',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './botmdec.component.html',
  styleUrl: './botmdec.component.css'
})
export class BotmdecComponent implements OnInit {
  PickOf: string = "Dec 24' Pick";
  bookTitle: string = "Throne of Glass by Sarah J. Maas";
  bookAuthor: string = "Sarah J. Maas";
  bookImage: string = "tog1.jpeg"; // Path to book image
  averageRating: number = 0; // Will be populated from actual book data
  description: string = `In a land devoid of magic, assassin Celaena Sardothien is summoned to the castle to compete against twenty-three murderers, thieves, and warriors for her freedom, but as the Crown Prince provokes her, the Captain of the Guard protects her, and a foreign princess befriends her, she discovers a deadly evil within the castle that turns her quest for freedom into a fight for survival.`;
  isModalOpen: boolean = false;
  bookId: number = 0; // Will be populated when book is found

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    try {
      // Get all books from the service
      const books = await this.authService.getAllBooks();
      
      // Find the Throne of Glass book
      const throneOfGlassBook = books.find(book => 
        book.title.toLowerCase().includes('throne of glass') || 
        (book.title.toLowerCase() === 'throne of glass')
      );
      
      // Update component properties if book is found
      if (throneOfGlassBook) {
        this.averageRating = throneOfGlassBook.rating || 5; // Use the rating from the book data, fallback to 5
        this.bookId = throneOfGlassBook.id || 0;
        
        // If there's a more detailed description in the book data, use that instead
        if (throneOfGlassBook.description && throneOfGlassBook.description.trim() !== '') {
          this.description = throneOfGlassBook.description;
        }
        
        // If there's author info in the book data, use that
        if (throneOfGlassBook.author && throneOfGlassBook.author.trim() !== '') {
          this.bookAuthor = throneOfGlassBook.author;
        }
      } else {
        console.log('Throne of Glass book not found in the books array, using default rating');
      }
    } catch (error) {
      console.error('Error fetching books data:', error);
    }
  }

  openModal() {
    this.isModalOpen = true;
  }
  
  closeModal() {
    this.isModalOpen = false;
  }
}

