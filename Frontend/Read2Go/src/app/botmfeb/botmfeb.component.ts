import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-botmfeb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './botmfeb.component.html',
  styleUrl: './botmfeb.component.css'
})
export class BotmfebComponent implements OnInit {
  PickOf: string = "Feb 25' Pick";
  bookTitle: string = "Iron Flame by Rebecca Yarros";
  bookAuthor: string = "Rebecca Yarros";
  bookImage: string = "ironflame.jpeg"; // Path to book image
  averageRating: number = 0; // Will be populated from actual book data
  description: string = `Violet Sorrengail, who expected to die during her first year at Basgiath War College, faces brutal challenges and the threat of the new vice commandant, who aims to teach her just how powerless she is unless she betrays the man she loves, while simultaneously learning the crucial lesson that dragon riders make their own rules, and she realizes that her determination alone may not be enough to survive the hidden dangers the school holds.`;
  isModalOpen: boolean = false;
  bookId: number = 0; // Will be populated when book is found

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    try {
      // Get all books from the service
      const books = await this.authService.getAllBooks();
      
      // Find the Iron Flame book
      const ironFlameBook = books.find(book => 
        book.title.toLowerCase().includes('iron flame') || 
        (book.title.toLowerCase() === 'iron flame')
      );
      
      // Update component properties if book is found
      if (ironFlameBook) {
        this.averageRating = ironFlameBook.rating || 4; // Use the rating from the book data, fallback to 4
        this.bookId = ironFlameBook.id || 0;
        
        // If there's a more detailed description in the book data, use that instead
        if (ironFlameBook.description && ironFlameBook.description.trim() !== '') {
          this.description = ironFlameBook.description;
        }
      } else {
        console.log('Iron Flame book not found in the books array, using default rating');
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
