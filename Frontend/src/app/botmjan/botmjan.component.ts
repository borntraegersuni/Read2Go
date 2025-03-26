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

/**
 * BotmjanComponent handles the display of the "Book of the Month" (January) feature.
 * It shows information about the featured book "Fourth Wing", retrieves book data
 * from the backend via AuthService, and provides modal functionality for additional book details.
 */

export class BotmjanComponent implements OnInit {
  PickOf: string = "Jan 25' Pick";
  bookTitle: string = "Fourth Wing by Rebecca Yarros";
  bookAuthor: string = "Rebecca Yarros";
  bookImage: string = "fourthwing.jpeg";
  averageRating: number = 0;
  description: string = `Violet Sorrengail, initially destined for a quiet life in the Scribe Quadrant, is thrust into the perilous world of dragon riders by her formidable mother, where her survival is threatened by her physical fragility, rival cadets, and the ruthless wingleader Xaden Riorson, all while a deadly war looms and a sinister secret within the leadership threatens to unravel everything at Basgiath War College, where the only exits are graduation or death.`;
  isModalOpen: boolean = false;
  bookId: number = 0;

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    try {
      const books = await this.authService.getAllBooks();
      
      const fourthWingBook = books.find(book => 
        book.title.toLowerCase().includes('fourth wing') || 
        (book.title.toLowerCase() === 'fourth wing')
      );
      
      if (fourthWingBook) {
        this.averageRating = fourthWingBook.rating || 5;
        this.bookId = fourthWingBook.id || 0;
        
        if (fourthWingBook.description && fourthWingBook.description.trim() !== '') {
          this.description = fourthWingBook.description;
        }
        
        if (fourthWingBook.author && fourthWingBook.author.trim() !== '') {
          this.bookAuthor = fourthWingBook.author;
        }
      } else {
        //console.log('Fourth Wing book not found in the books array, using default rating');
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
