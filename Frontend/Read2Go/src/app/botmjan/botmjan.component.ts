import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-botmjan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './botmjan.component.html',
  styleUrl: './botmjan.component.css'
})
export class BotmjanComponent implements OnInit {
  PickOf: string = "Jan 25' Pick";
  bookTitle: string = "Fourth Wing by Rebecca Yarros";
  bookAuthor: string = "Rebecca Yarros";
  bookImage: string = "fourthwing.jpeg"; // Path to book image
  averageRating: number = 0; // Will be populated from actual book data
  description: string = `Violet Sorrengail, initially destined for a quiet life in the Scribe Quadrant, is thrust into the perilous world of dragon riders by her formidable mother, where her survival is threatened by her physical fragility, rival cadets, and the ruthless wingleader Xaden Riorson, all while a deadly war looms and a sinister secret within the leadership threatens to unravel everything at Basgiath War College, where the only exits are graduation or death.`;
  isModalOpen: boolean = false;
  bookId: number = 0; // Will be populated when book is found

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    try {
      // Get all books from the service
      const books = await this.authService.getAllBooks();
      
      // Find the Fourth Wing book
      const fourthWingBook = books.find(book => 
        book.title.toLowerCase().includes('fourth wing') || 
        (book.title.toLowerCase() === 'fourth wing')
      );
      
      // Update component properties if book is found
      if (fourthWingBook) {
        this.averageRating = fourthWingBook.rating || 5; // Use the rating from the book data, fallback to 5
        this.bookId = fourthWingBook.id || 0;
        
        // If there's a more detailed description in the book data, use that instead
        if (fourthWingBook.description && fourthWingBook.description.trim() !== '') {
          this.description = fourthWingBook.description;
        }
        
        // If there's author info in the book data, use that
        if (fourthWingBook.author && fourthWingBook.author.trim() !== '') {
          this.bookAuthor = fourthWingBook.author;
        }
      } else {
        console.log('Fourth Wing book not found in the books array, using default rating');
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
